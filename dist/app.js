const API_URL = "https://api.mcsrvstat.us/3/play.aragonite.fr";
const REFRESH_MS = 60000;
const $ = (id) => document.getElementById(id);

async function refreshStatus() {
  const state = $("server-state");
  try {
    const response = await fetch(API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("status");
    const data = await response.json();
    if (data.online) {
      const online = Number(data.players?.online ?? 0);
      $("players-online").textContent = online.toLocaleString("fr-FR");
      $("players-unique").textContent = online.toLocaleString("fr-FR");
      $("players-max").textContent = Number(data.players?.max ?? 0).toLocaleString("fr-FR");
      $("server-version").textContent = data.version || "Minecraft";
      state.textContent = "En ligne";
      state.style.color = "#73e8ab";
      $("server-sub").textContent = data.motd?.clean?.[0] || "Le serveur répond au ping";
      $("stats-updated").textContent = "Statut vérifié à " + new Date().toLocaleTimeString("fr-FR", {hour:"2-digit",minute:"2-digit"}) + " · Actualisation chaque minute.";
    } else {
      $("players-online").textContent = "0";
      $("players-unique").textContent = "0";
      $("players-max").textContent = "—";
      state.textContent = "Hors ligne";
      state.style.color = "#ff8b80";
      $("server-sub").textContent = "Le serveur ne répond pas actuellement";
      $("stats-updated").textContent = "Dernière vérification : " + new Date().toLocaleTimeString("fr-FR", {hour:"2-digit",minute:"2-digit"}) + " · Nouvelle tentative dans 60 s.";
    }
  } catch {
    state.textContent = "Indisponible";
    state.style.color = "#ffc46b";
    $("server-sub").textContent = "Impossible de récupérer le statut en direct";
    $("stats-updated").textContent = "Vérifie directement dans Minecraft · Nouvelle tentative dans 60 s.";
  }
}

function route() {
  const page = location.hash.slice(1) || "accueil";
  const allowed = ["accueil", "wiki", "vote"];
  const current = allowed.includes(page) ? page : "accueil";
  document.querySelectorAll(".page").forEach((element) => {
    const active = element.id === "page-" + current;
    element.classList.toggle("active", active);
    element.setAttribute("aria-hidden", String(!active));
  });
  document.querySelectorAll(".nav [data-route]").forEach((link) => {
    const active = link.dataset.route === current;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelector(".nav").classList.remove("open");
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  window.scrollTo({top:0,behavior:"smooth"});
}

window.addEventListener("hashchange", route);
route();
refreshStatus();
setInterval(refreshStatus, REFRESH_MS);

const toast = document.querySelector(".toast");
let toastTimer;
document.querySelectorAll(".copy-ip").forEach((button) => button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    toast.textContent = "Adresse copiée : " + button.dataset.copy;
  } catch {
    toast.textContent = "Adresse du serveur : " + button.dataset.copy;
  }
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}));
document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const open = document.querySelector(".nav").classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});

const voteMessage = $("vote-message");
const voteStart = $("vote-start");
const voteExternal = $("vote-external");
const voteVerify = $("vote-verify");
const wheelPanel = $("wheel-panel");
const wheelButton = $("wheel-spin");
const wheel = $("reward-wheel");
const wheelResult = $("wheel-result");
const voteHandleKey = "aragonite-vote-session";

function showVoteMessage(message, tone = "") {
  voteMessage.textContent = message;
  voteMessage.className = "vote-message" + (tone ? " " + tone : "");
}

async function jsonRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Le service de vote est momentanément indisponible.");
  return data;
}

async function loadVoteLeaderboard() {
  const list = $("vote-leaderboard");
  try {
    const data = await jsonRequest("/api/vote/leaderboard", { method: "GET", headers: {} });
    list.replaceChildren();
    if (!data.entries?.length) {
      const empty = document.createElement("li");
      empty.className = "leaderboard-empty";
      empty.textContent = "Aucun vote pour le moment.";
      list.append(empty);
      return;
    }
    for (const entry of data.entries.slice(0, 10)) {
      const row = document.createElement("li");
      const rank = document.createElement("span");
      rank.className = "rank";
      rank.textContent = String(entry.rank).padStart(2, "0");
      const name = document.createElement("span");
      name.className = "leader-name";
      name.textContent = entry.username;
      const votes = document.createElement("span");
      votes.className = "leader-votes";
      votes.textContent = entry.votes + (entry.votes === 1 ? " vote" : " votes");
      row.append(rank, name, votes);
      list.append(row);
    }
  } catch (error) {
    list.replaceChildren();
    const empty = document.createElement("li");
    empty.className = "leaderboard-empty";
    empty.textContent = error.message;
    list.append(empty);
  }
}

function showSpinStatus(data) {
  wheelPanel.classList.remove("hidden");
  $("wheel-player").textContent = "Récompense liée à " + data.username + ".";
  if (data.spun) {
    wheelButton.classList.add("hidden");
    wheelResult.textContent = data.reward_label + " · lot prêt en jeu avec /vote";
  } else {
    wheelButton.classList.remove("hidden");
    wheelResult.textContent = "";
  }
}

async function loadVoteStatus() {
  try {
    const data = await jsonRequest("/api/vote/status", { method: "GET", headers: {} });
    if (data.verified) {
      showSpinStatus(data);
      voteVerify.classList.add("hidden");
      voteExternal.classList.add("hidden");
      showVoteMessage("Vote vérifié pour " + data.username + ".", "success");
    }
  } catch {}
}

voteStart.addEventListener("click", async () => {
  const username = $("vote-username").value.trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    showVoteMessage("Entre un pseudo Minecraft valide de 3 à 16 caractères.", "error");
    $("vote-username").focus();
    return;
  }
  voteStart.disabled = true;
  showVoteMessage("Préparation du vote sécurisé…");
  try {
    const data = await jsonRequest("/api/vote/start", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    sessionStorage.setItem(voteHandleKey, data.sessionHandle);
    voteExternal.href = data.voteUrl;
    voteExternal.classList.remove("hidden");
    voteVerify.classList.remove("hidden");
    showVoteMessage("Ouvre la page Serveur-Privé, vote avec le même pseudo, puis reviens cliquer sur « vérifier ».");
  } catch (error) {
    showVoteMessage(error.message, "error");
  } finally {
    voteStart.disabled = false;
  }
});

voteVerify.addEventListener("click", async () => {
  const sessionHandle = sessionStorage.getItem(voteHandleKey);
  if (!sessionHandle) {
    showVoteMessage("Prépare d’abord ton vote avec ton pseudo Minecraft.", "error");
    return;
  }
  voteVerify.disabled = true;
  showVoteMessage("Vérification du vote auprès de Serveur-Privé…");
  try {
    const data = await jsonRequest("/api/vote/verify", {
      method: "POST",
      body: JSON.stringify({ sessionHandle }),
    });
    sessionStorage.removeItem(voteHandleKey);
    showVoteStatusAfterVerify(data);
  } catch (error) {
    showVoteMessage(error.message, "error");
  } finally {
    voteVerify.disabled = false;
  }
});

function showVoteStatusAfterVerify(data) {
  showSpinStatus({ ...data, spun: false });
  voteVerify.classList.add("hidden");
  voteExternal.classList.add("hidden");
  showVoteMessage("Vote confirmé pour " + data.username + ". Tu as un lancer.", "success");
}

wheelButton.addEventListener("click", async () => {
  wheelButton.disabled = true;
  wheelResult.textContent = "La roue tourne…";
  try {
    const data = await jsonRequest("/api/vote/spin", { method: "POST", body: "{}" });
    const centers = [72, 162, 270, 324, 351];
    const rotation = 7 * 360 + 360 - centers[data.reward_index];
    wheel.style.transform = "rotate(" + rotation + "deg)";
    window.setTimeout(() => {
      wheelButton.classList.add("hidden");
      wheelResult.textContent = "Tu as gagné " + data.reward_label + " ! Connecte-toi et tape /vote en jeu.";
      $("wheel-player").textContent = "Récompense obtenue par " + data.username + ".";
      showVoteMessage("Ton lot t’attend en jeu avec /vote.", "success");
    }, 5100);
  } catch (error) {
    wheelResult.textContent = "";
    showVoteMessage(error.message, "error");
    wheelButton.disabled = false;
  }
});

loadVoteLeaderboard();
loadVoteStatus();
