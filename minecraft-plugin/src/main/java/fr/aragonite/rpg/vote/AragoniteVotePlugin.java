package fr.aragonite.rpg.vote;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.plugin.RegisteredServiceProvider;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.Duration;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

public final class AragoniteVotePlugin extends JavaPlugin implements CommandExecutor {
    private final Set<UUID> inFlight = ConcurrentHashMap.newKeySet();
    private HttpClient http;
    private String siteUrl;
    private String apiKey;
    private Duration timeout;

    @Override public void onEnable() {
        saveDefaultConfig();
        siteUrl = getConfig().getString("site-url", "").trim().replaceAll("/+$", "");
        apiKey = getConfig().getString("api-key", "").trim();
        timeout = Duration.ofSeconds(Math.max(3, Math.min(20, getConfig().getInt("request-timeout-seconds", 8))));
        http = HttpClient.newBuilder().connectTimeout(timeout).build();
        if (siteUrl.isBlank() || apiKey.isBlank()) {
            getLogger().warning("Configure site-url et api-key dans plugins/AragoniteVote/config.yml.");
        }
        var command = getCommand("vote");
        if (command == null) throw new IllegalStateException("La commande /vote manque dans plugin.yml.");
        command.setExecutor(this);
    }

    @Override public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player player)) {
            sender.sendMessage("Cette commande est réservée aux joueurs.");
            return true;
        }
        if (!player.hasPermission("aragonite.vote.claim")) {
            player.sendMessage("Tu n’as pas la permission de récupérer les lots de vote.");
            return true;
        }
        if (siteUrl.isBlank() || apiKey.isBlank()) {
            player.sendMessage("Le système de récompenses de vote n’est pas encore configuré.");
            return true;
        }
        UUID uuid = player.getUniqueId();
        if (!inFlight.add(uuid)) {
            player.sendMessage("Ta récompense est en cours de vérification.");
            return true;
        }
        player.sendMessage("Vérification de tes récompenses de vote…");
        requestClaim(player);
        return true;
    }

    private void requestClaim(Player player) {
        JsonObject payload = new JsonObject();
        payload.addProperty("username", player.getName());
        payload.addProperty("uuid", player.getUniqueId().toString());
        HttpRequest request = request("/api/game/claim")
                .POST(HttpRequest.BodyPublishers.ofString(payload.toString()))
                .build();
        http.sendAsync(request, HttpResponse.BodyHandlers.ofString()).whenComplete((response, error) -> {
            if (error != null) {
                finish(player, "Impossible de joindre le service de récompenses. Réessaie dans un instant.");
                getLogger().warning("Échec de vérification du vote : " + error.getClass().getSimpleName());
                return;
            }
            JsonObject data = parse(response.body());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                finish(player, message(data, "Le service de récompenses a refusé la demande."));
                getLogger().warning("API vote claim HTTP " + response.statusCode());
                return;
            }
            Bukkit.getScheduler().runTask(this, () -> handleClaimResponse(player, data));
        });
    }

    private void handleClaimResponse(Player player, JsonObject data) {
        if (!player.isOnline()) {
            inFlight.remove(player.getUniqueId());
            return;
        }
        if (!data.has("pending") || !data.get("pending").isJsonPrimitive()
                || !data.getAsJsonPrimitive("pending").isBoolean()) {
            finish(player, "Réponse invalide du service de récompenses. Réessaie dans un instant.");
            getLogger().warning("Réponse invalide de l’API vote claim : champ pending absent ou invalide.");
            return;
        }
        if (!data.get("pending").getAsBoolean()) {
            finish(player, "Aucune récompense en attente. Vote sur le site, vérifie ton vote, puis relance /vote.");
            return;
        }

        String claimId = string(data, "claimId");
        String lease = string(data, "lease");
        Long xp = number(data, "xp");
        Long gold = number(data, "gold");
        if (claimId.isBlank() || lease.isBlank() || xp == null || gold == null || xp < 0 || gold < 0) {
            finish(player, "Réponse invalide du service de récompenses. Réessaie dans un instant.");
            getLogger().warning("Réponse incomplète de l’API vote claim; récompense non appliquée.");
            return;
        }

        Plugin rpgCore = getServer().getPluginManager().getPlugin("RPGCore");
        if (rpgCore == null || !rpgCore.isEnabled()) {
            release(player, claimId, lease, "RPGCore n’est pas disponible pour enregistrer le lot.");
            return;
        }

        try {
            Class<?> apiClass = Class.forName("fr.aragonite.rpg.core.RpgCoreApi", true, rpgCore.getClass().getClassLoader());
            RegisteredServiceProvider<?> registration = getServer().getServicesManager().getRegistration(apiClass);
            if (registration == null) {
                release(player, claimId, lease, "RPGCore n’est pas disponible pour enregistrer le lot.");
                return;
            }

            Method applyVoteReward = apiClass.getMethod(
                    "applyVoteReward", Player.class, String.class, long.class, long.class, Consumer.class);
            Consumer<Boolean> savedCallback = saved -> {
                if (!Boolean.TRUE.equals(saved)) {
                    release(player, claimId, lease, "Le profil RPG n’a pas confirmé le lot. Réessaie avec /vote.");
                    return;
                }
                acknowledge(player, claimId, lease, xp, gold);
            };
            Object accepted = applyVoteReward.invoke(registration.getProvider(), player, claimId, xp, gold, savedCallback);
            if (!Boolean.TRUE.equals(accepted)) {
                release(player, claimId, lease, "Ton profil RPG charge encore. Réessaie avec /vote.");
            }
        } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException error) {
            getLogger().severe("API RPGCore incompatible avec le plugin de vote : " + error.getClass().getSimpleName());
            release(player, claimId, lease, "La liaison au profil RPG a échoué. Réessaie dans un instant.");
        } catch (InvocationTargetException error) {
            Throwable cause = error.getCause();
            getLogger().severe("RPGCore n’a pas pu enregistrer le lot : "
                    + (cause == null ? error.getClass().getSimpleName() : cause.getClass().getSimpleName()));
            release(player, claimId, lease, "La sauvegarde du lot a échoué. Réessaie avec /vote.");
        }
    }

    private void acknowledge(Player player, String claimId, String lease, long xp, long gold) {
        JsonObject payload = new JsonObject();
        payload.addProperty("claimId", claimId);
        payload.addProperty("lease", lease);
        payload.addProperty("uuid", player.getUniqueId().toString());
        send("/api/game/ack", payload).whenComplete((response, error) -> {
            if (error != null || response.statusCode() < 200 || response.statusCode() >= 300) {
                getLogger().warning("Le profil RPG est enregistré, mais la confirmation du lot attendra une nouvelle tentative.");
            }
            finish(player, "Récompense de vote récupérée : " + xp + " XP et " + gold + " pièces d’or. Bon jeu !");
        });
    }

    private void release(Player player, String claimId, String lease, String notice) {
        JsonObject payload = new JsonObject();
        payload.addProperty("claimId", claimId);
        payload.addProperty("lease", lease);
        send("/api/game/release", payload).whenComplete((response, error) -> {
            if (error != null || response.statusCode() < 200 || response.statusCode() >= 300) {
                getLogger().warning("Impossible de libérer le lot de vote; le bail expirera automatiquement.");
            }
            finish(player, notice);
        });
    }

    private java.util.concurrent.CompletableFuture<HttpResponse<String>> send(String path, JsonObject body) {
        return http.sendAsync(request(path).POST(HttpRequest.BodyPublishers.ofString(body.toString())).build(),
                HttpResponse.BodyHandlers.ofString());
    }

    private HttpRequest.Builder request(String path) {
        return HttpRequest.newBuilder(URI.create(siteUrl + path))
                .timeout(timeout)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json");
    }

    private static JsonObject parse(String source) {
        try {
            var value = JsonParser.parseString(source);
            return value.isJsonObject() ? value.getAsJsonObject() : new JsonObject();
        } catch (RuntimeException ignored) {
            return new JsonObject();
        }
    }

    private static String string(JsonObject data, String key) {
        return data.has(key) && data.get(key).isJsonPrimitive()
                && data.getAsJsonPrimitive(key).isString() ? data.get(key).getAsString() : "";
    }

    private static Long number(JsonObject data, String key) {
        if (!data.has(key) || !data.get(key).isJsonPrimitive() || !data.getAsJsonPrimitive(key).isNumber()) {
            return null;
        }
        try {
            return Long.parseLong(data.get(key).getAsString());
        } catch (NumberFormatException error) {
            return null;
        }
    }

    private static String message(JsonObject data, String fallback) {
        return string(data, "message").isBlank() ? fallback : string(data, "message");
    }

    private void finish(Player player, String message) {
        inFlight.remove(player.getUniqueId());
        Bukkit.getScheduler().runTask(this, () -> {
            if (player.isOnline()) player.sendMessage(message);
        });
    }
}
