const ASSETS = __ARAGONITE_ASSETS__;
const VOTE_PAGE = "https://serveur-prive.net/minecraft/aragonite";
const COOKIE_NAME = "aragonite_vote_session";
const REWARDS = [
  { id: "xp_100", label: "100 XP RPG", xp: 100, gold: 0, weight: 40 },
  { id: "xp_250", label: "250 XP RPG", xp: 250, gold: 0, weight: 25 },
  { id: "gold_50", label: "50 pièces d’or", xp: 0, gold: 50, weight: 20 },
  { id: "gold_100", label: "100 pièces d’or", xp: 0, gold: 100, weight: 10 },
  { id: "xp_gold", label: "100 XP + 100 pièces d’or", xp: 100, gold: 100, weight: 5 },
];

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

function message(text, status) {
  return json({ message: text }, status);
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function randomHex(bytes = 32) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return Array.from(data, (value) => value.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
}

function cookie(request, name) {
  const source = request.headers.get("cookie") || "";
  for (const part of source.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

function sameSecret(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index++) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function readJson(request, maximum = 2048) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maximum) throw new Error("Requête trop volumineuse.");
  const raw = await request.text();
  if (raw.length > maximum) throw new Error("Requête trop volumineuse.");
  return raw ? JSON.parse(raw) : {};
}

async function serverPrive(env, path) {
  if (!env.SERVER_PRIVE_TOKEN) throw new Error("Le service de vote n’est pas encore configuré.");
  const response = await fetch("https://serveur-prive.net/api/v1/servers/" +
    encodeURIComponent(env.SERVER_PRIVE_TOKEN) + path, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("La plateforme de vote ne répond pas.");
  const result = await response.json();
  if (!result?.success) throw new Error("La plateforme n’a pas confirmé cette opération.");
  return result.data;
}

async function startVote(request, env) {
  let body;
  try { body = await readJson(request); } catch { return message("Requête de vote invalide.", 400); }
  const username = String(body.username || "").trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) return message("Entre un pseudo Minecraft valide de 3 à 16 caractères.", 400);
  if (!env.SERVER_PRIVE_TOKEN) return message("Le vote en ligne attend la configuration de la fiche Serveur-Privé.", 503);

  const now = nowSeconds();
  const existing = await env.DB.prepare(
    "SELECT 1 AS pending FROM vote_sessions WHERE requested_username = ? COLLATE NOCASE AND status = 'pending' AND expires_at > ? LIMIT 1"
  ).bind(username, now).first();
  if (existing) return message("Un vote est déjà en cours pour ce pseudo. Termine-le ou attends 5 minutes.", 429);

  let otp;
  try { otp = await serverPrive(env, "/otp"); } catch (error) { return message(error.message, 503); }
  const token = String(otp.token || "");
  if (!token) return message("La plateforme n’a pas fourni de jeton de vote.", 503);

  const handle = randomHex(32);
  const handleHash = await sha256(handle);
  await env.DB.prepare(
    "INSERT INTO vote_sessions (handle_hash, otp_token, requested_username, status, created_at, expires_at) VALUES (?, ?, ?, 'pending', ?, ?)"
  ).bind(handleHash, token, username, now, now + 300).run();
  const voteUrl = VOTE_PAGE + "?token=" + encodeURIComponent(token);
  return json({ sessionHandle: handle, voteUrl, expiresIn: 300 });
}

async function verifyVote(request, env) {
  let body;
  try { body = await readJson(request); } catch { return message("Requête de vérification invalide.", 400); }
  const handle = String(body.sessionHandle || "");
  if (!/^[a-f0-9]{64}$/.test(handle)) return message("Session de vote invalide.", 400);
  const handleHash = await sha256(handle);
  const row = await env.DB.prepare(
    "SELECT * FROM vote_sessions WHERE handle_hash = ?"
  ).bind(handleHash).first();
  if (!row) return message("Session de vote introuvable. Prépare un nouveau vote.", 404);
  if (row.status === "pending" && row.expires_at <= nowSeconds()) return message("Le jeton a expiré. Prépare un nouveau vote.", 410);

  let username = row.verified_username;
  let voteId = row.vote_id;
  if (row.status === "pending") {
    let vote;
    try { vote = await serverPrive(env, "/votes/otp/" + encodeURIComponent(row.otp_token)); }
    catch (error) {
      const status = /pas confirmé/i.test(error.message) ? 409 : 503;
      return message(status === 409 ? "Vote pas encore confirmé. Termine le formulaire puis réessaie." : error.message, status);
    }
    username = String(vote.username || row.requested_username).trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) return message("Pseudo retourné par la plateforme invalide.", 422);
    // Stable event key makes concurrent callbacks idempotent before the session is marked verified.
    voteId = await sha256("vote:" + row.otp_token);
    const votedAt = Number(vote.voted_at) || nowSeconds();
    await env.DB.batch([
      env.DB.prepare(
        "INSERT OR IGNORE INTO vote_events (id, otp_token_hash, username, voted_at, claim_state) VALUES (?, ?, ?, ?, 'unspun')"
      ).bind(voteId, await sha256(row.otp_token), username, votedAt),
      env.DB.prepare(
        "UPDATE vote_sessions SET status = 'verified', verified_username = ?, vote_id = ?, session_cookie_hash = ?, expires_at = ? WHERE handle_hash = ? AND status = 'pending'"
      ).bind(username, voteId, handleHash, nowSeconds() + 86400, handleHash),
    ]);
  } else if (row.status === "spun") {
    return message("Ce vote a déjà utilisé sa roue.", 409);
  }

  const event = await env.DB.prepare("SELECT claim_state, reward_label FROM vote_events WHERE id = ?").bind(voteId).first();
  if (!event) return message("Vote vérifié, mais la récompense n’a pas pu être préparée.", 503);
  return json(
    { verified: true, username, spun: event.claim_state !== "unspun", reward_label: event.reward_label || "" },
    200,
    { "set-cookie": COOKIE_NAME + "=" + encodeURIComponent(handle) + "; Path=/; Max-Age=86400; Secure; HttpOnly; SameSite=Lax" }
  );
}

async function voteStatus(request, env) {
  const handle = cookie(request, COOKIE_NAME);
  if (!/^[a-f0-9]{64}$/.test(handle)) return json({ verified: false });
  const hash = await sha256(handle);
  const row = await env.DB.prepare(
    "SELECT s.verified_username AS username, e.claim_state, e.reward_label FROM vote_sessions s JOIN vote_events e ON e.id = s.vote_id WHERE s.session_cookie_hash = ? AND s.status IN ('verified', 'spun') AND s.expires_at > ? LIMIT 1"
  ).bind(hash, nowSeconds()).first();
  if (!row) return json({ verified: false });
  return json({
    verified: true,
    username: row.username,
    spun: row.claim_state !== "unspun",
    reward_label: row.reward_label || "",
  });
}

function secureRewardIndex() {
  const max = 0x100000000;
  const limit = Math.floor(max / 100) * 100;
  const word = new Uint32Array(1);
  let value;
  do { crypto.getRandomValues(word); value = word[0]; } while (value >= limit);
  const pick = value % 100;
  let cumulative = 0;
  for (let index = 0; index < REWARDS.length; index++) {
    cumulative += REWARDS[index].weight;
    if (pick < cumulative) return index;
  }
  return REWARDS.length - 1;
}

async function spinVote(request, env) {
  const handle = cookie(request, COOKIE_NAME);
  if (!/^[a-f0-9]{64}$/.test(handle)) return message("Vérifie ton vote avant de lancer la roue.", 401);
  const hash = await sha256(handle);
  const session = await env.DB.prepare(
    "SELECT vote_id, verified_username FROM vote_sessions WHERE session_cookie_hash = ? AND status = 'verified' AND expires_at > ? LIMIT 1"
  ).bind(hash, nowSeconds()).first();
  if (!session) return message("Aucun lancer disponible. Vérifie d’abord ton vote.", 409);
  const index = secureRewardIndex();
  const reward = REWARDS[index];
  const claimId = crypto.randomUUID();
  const result = await env.DB.prepare(
    "UPDATE vote_events SET spin_claim_id = ?, reward_index = ?, reward_label = ?, reward_xp = ?, reward_gold = ?, claim_state = 'ready' WHERE id = ? AND claim_state = 'unspun' RETURNING id"
  ).bind(claimId, index, reward.label, reward.xp, reward.gold, session.vote_id).first();
  if (!result) return message("La roue a déjà été lancée pour ce vote.", 409);
  await env.DB.prepare("UPDATE vote_sessions SET status = 'spun' WHERE vote_id = ?").bind(session.vote_id).run();
  return json({ claimId, username: session.verified_username, reward_index: index, reward_label: reward.label });
}

function validGameKey(request, env) {
  const supplied = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return env.GAME_API_KEY && sameSecret(supplied, env.GAME_API_KEY);
}

async function gameClaim(request, env) {
  if (!validGameKey(request, env)) return message("Authentification du plugin invalide.", 401);
  let body;
  try { body = await readJson(request); } catch { return message("Requête du plugin invalide.", 400); }
  const username = String(body.username || "").trim();
  const uuid = String(body.uuid || "").trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username) || !/^[a-f0-9-]{36}$/i.test(uuid)) {
    return message("Pseudo ou UUID invalide.", 400);
  }
  const now = nowSeconds();
  const lease = randomHex(24);
  const claim = await env.DB.prepare(
    "UPDATE vote_events SET claim_state = 'processing', claim_lease = ?, lease_expires_at = ?, claim_uuid = ? WHERE id = (SELECT id FROM vote_events WHERE username = ? COLLATE NOCASE AND (claim_state = 'ready' OR (claim_state = 'processing' AND lease_expires_at < ?)) ORDER BY voted_at ASC LIMIT 1) RETURNING id, username, reward_xp, reward_gold, reward_label"
  ).bind(lease, now + 120, uuid, username, now).first();
  if (!claim) return json({ pending: false });
  return json({ pending: true, claimId: claim.id, lease, username: claim.username, xp: claim.reward_xp, gold: claim.reward_gold, label: claim.reward_label });
}

async function gameAck(request, env) {
  if (!validGameKey(request, env)) return message("Authentification du plugin invalide.", 401);
  let body;
  try { body = await readJson(request); } catch { return message("Requête du plugin invalide.", 400); }
  const claimId = String(body.claimId || "");
  const lease = String(body.lease || "");
  const uuid = String(body.uuid || "");
  const result = await env.DB.prepare(
    "UPDATE vote_events SET claim_state = 'delivered', delivered_at = ?, claim_lease = NULL, lease_expires_at = NULL WHERE id = ? AND claim_lease = ? AND claim_uuid = ? AND claim_state = 'processing' RETURNING id"
  ).bind(nowSeconds(), claimId, lease, uuid).first();
  if (!result) return message("La récompense est déjà récupérée ou le bail a expiré.", 409);
  return json({ acknowledged: true });
}

async function gameRelease(request, env) {
  if (!validGameKey(request, env)) return message("Authentification du plugin invalide.", 401);
  let body;
  try { body = await readJson(request); } catch { return message("Requête du plugin invalide.", 400); }
  await env.DB.prepare(
    "UPDATE vote_events SET claim_state = 'ready', claim_lease = NULL, lease_expires_at = NULL, claim_uuid = NULL WHERE id = ? AND claim_lease = ? AND claim_state = 'processing'"
  ).bind(String(body.claimId || ""), String(body.lease || "")).run();
  return json({ released: true });
}

async function leaderboard(env) {
  let data;
  try { data = await serverPrive(env, "/voters"); } catch (error) { return message(error.message, 503); }
  const entries = Array.isArray(data)
    ? data.slice(0, 10).map((entry, index) => ({
        rank: Number(entry.position) || index + 1,
        username: String(entry.username || "Joueur"),
        votes: Number(entry.votes) || 0,
      }))
    : [];
  return json({ entries }, 200, { "cache-control": "public, max-age=60" });
}

async function handleApi(request, env) {
  const { pathname } = new URL(request.url);
  if (pathname === "/api/vote/start" && request.method === "POST") return startVote(request, env);
  if (pathname === "/api/vote/verify" && request.method === "POST") return verifyVote(request, env);
  if (pathname === "/api/vote/status" && request.method === "GET") return voteStatus(request, env);
  if (pathname === "/api/vote/spin" && request.method === "POST") return spinVote(request, env);
  if (pathname === "/api/vote/leaderboard" && request.method === "GET") return leaderboard(env);
  if (pathname === "/api/game/claim" && request.method === "POST") return gameClaim(request, env);
  if (pathname === "/api/game/ack" && request.method === "POST") return gameAck(request, env);
  if (pathname === "/api/game/release" && request.method === "POST") return gameRelease(request, env);
  return message("Route introuvable.", 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try { return await handleApi(request, env); }
      catch (error) {
        console.error("Aragonite vote API failure:", error instanceof Error ? error.message : "unknown");
        return message("Le service de vote rencontre une erreur. Réessaie dans un instant.", 500);
      }
    }
    if (request.method !== "GET" && request.method !== "HEAD") return message("Méthode non autorisée.", 405);
    const assetPath = url.pathname === "/" || url.pathname === "/index.html" ? "html"
      : url.pathname === "/style.css" ? "css"
      : url.pathname === "/app.js" ? "app" : null;
    if (!assetPath) return new Response("Not found", { status: 404 });
    const contentType = assetPath === "html" ? "text/html; charset=utf-8"
      : assetPath === "css" ? "text/css; charset=utf-8"
      : "text/javascript; charset=utf-8";
    const headers = {
      "content-type": contentType,
      "cache-control": assetPath === "html" ? "no-cache" : "public, max-age=3600",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
    };
    return new Response(request.method === "HEAD" ? null : ASSETS[assetPath], { headers });
  },
};
