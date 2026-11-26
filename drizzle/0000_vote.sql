CREATE TABLE IF NOT EXISTS vote_sessions (
  handle_hash TEXT PRIMARY KEY,
  otp_token TEXT NOT NULL UNIQUE,
  requested_username TEXT NOT NULL,
  verified_username TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'spun')),
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  session_cookie_hash TEXT,
  vote_id TEXT UNIQUE
);

CREATE INDEX IF NOT EXISTS vote_sessions_username_expiry
  ON vote_sessions(requested_username, status, expires_at);

CREATE TABLE IF NOT EXISTS vote_events (
  id TEXT PRIMARY KEY,
  otp_token_hash TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  voted_at INTEGER NOT NULL,
  spin_claim_id TEXT UNIQUE,
  reward_index INTEGER,
  reward_label TEXT,
  reward_xp INTEGER NOT NULL DEFAULT 0,
  reward_gold INTEGER NOT NULL DEFAULT 0,
  claim_state TEXT NOT NULL DEFAULT 'unspun'
    CHECK (claim_state IN ('unspun', 'ready', 'processing', 'delivered')),
  claim_lease TEXT,
  lease_expires_at INTEGER,
  claim_uuid TEXT,
  delivered_at INTEGER
);

CREATE INDEX IF NOT EXISTS vote_events_user_pending
  ON vote_events(username COLLATE NOCASE, claim_state, voted_at);
