const ASSETS = {"html":"<!doctype html>\n<html lang=\"fr\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"theme-color\" content=\"#0a0e14\">\n  <link rel=\"icon\" type=\"image/png\" sizes=\"512x512\" href=\"./discord-icon.png\">\n  <meta name=\"description\" content=\"Aragonite : choisis ta classe, progresse à Valoria, explore Dwarf City et pars en donjon. Statut et joueurs en direct.\">\n  <title>Aragonite — Serveur Minecraft</title>\n  <link rel=\"preconnect\" href=\"https://api.mcsrvstat.us\">\n  <link rel=\"stylesheet\" href=\"./style.css\">\n  <script defer src=\"./app.js\"></script>\n</head>\n<body>\n  <div class=\"site-shell\">\n    <header class=\"topbar\">\n      <a class=\"brand\" href=\"#accueil\" aria-label=\"Aragonite, accueil\">\n        <img class=\"brand-logo\" src=\"./discord-icon.png\" alt=\"\" width=\"34\" height=\"34\"><span>ARAGONITE</span>\n      </a>\n      <nav class=\"nav\" aria-label=\"Navigation principale\">\n        <a href=\"#accueil\" data-route=\"accueil\" class=\"active\">Accueil</a>\n        <a href=\"#wiki\" data-route=\"wiki\">Wiki</a>\n        <a href=\"#vote\" data-route=\"vote\">Vote</a>\n      </nav>\n      <a class=\"discord-top\" href=\"https://discord.gg/5r7CCcNTKs\" target=\"_blank\" rel=\"noreferrer\">Discord <span aria-hidden=\"true\"></span></a>\n      <button class=\"menu-toggle\" aria-label=\"Ouvrir le menu\" aria-expanded=\"false\">☰</button>\n    </header>\n\n    <main>\n      <section id=\"page-accueil\" class=\"page active\" aria-labelledby=\"hero-title\">\n        <div class=\"hero\">\n          <div class=\"hero-grid\"></div>\n          <div class=\"hero-copy\">\n            <div class=\"eyebrow\"><span class=\"eyebrow-line\"></span> MINECRAFT · RPG</div>\n            <h1 id=\"hero-title\">Écris ta légende.<br><em>Explore Aragonite.</em></h1>\n            <p class=\"hero-text\">Choisis ta classe, gagne de l’expérience et de l’or, puis pars explorer Valoria et les donjons de Dwarf City.</p>\n            <div class=\"hero-actions\">\n              <button class=\"button button-primary copy-ip\" data-copy=\"play.aragonite.fr\"><span class=\"button-icon\">＋</span> Jouer maintenant</button>\n              <a class=\"button button-quiet\" href=\"https://discord.gg/5r7CCcNTKs\" target=\"_blank\" rel=\"noreferrer\">Rejoindre le Discord <span></span></a>\n            </div>\n            <div class=\"hero-version\"><span class=\"live-dot\"></span> ARAGONITE <span class=\"separator\">/</span> IP <strong>play.aragonite.fr</strong></div>\n          </div>\n          <div class=\"hero-art\" aria-hidden=\"true\">\n            <div class=\"orb orb-one\"></div><div class=\"orb orb-two\"></div>\n            <div class=\"crystal crystal-back\"></div><div class=\"crystal crystal-front\"></div>\n            <div class=\"hero-rune\">ᚨ</div>\n            <div class=\"art-caption\"><span>ARAGONITE</span><small>RPG · FR</small></div>\n          </div>\n          <div class=\"hero-index\">01 <span>/</span> 03</div>\n        </div>\n\n        <section class=\"stats-wrap\" aria-label=\"Statut du serveur\">\n          <div class=\"stats-head\"><div><span class=\"section-kicker\">LE ROYAUME EN DIRECT</span><h2>Le serveur, maintenant</h2></div><div class=\"refresh-note\"><span class=\"live-dot\"></span> Actualisé automatiquement</div></div>\n          <div class=\"stats-grid\">\n            <article class=\"stat-card stat-status\"><div class=\"stat-label\">ÉTAT DU SERVEUR</div><div class=\"stat-value\" id=\"server-state\">Connexion…</div><div class=\"stat-sub\" id=\"server-sub\">Vérification du ping Minecraft</div><span class=\"stat-glyph\">◈</span></article>\n            <article class=\"stat-card\"><div class=\"stat-label\">JOUEURS EN LIGNE</div><div class=\"stat-value\"><span id=\"players-online\">—</span><span class=\"stat-total\"> / <span id=\"players-max\">—</span></span></div><div class=\"stat-sub\">Connectés en ce moment</div><span class=\"stat-glyph\">♟</span></article>\n            <article class=\"stat-card\"><div class=\"stat-label\">JOUEURS UNIQUES EN LIGNE</div><div class=\"stat-value\" id=\"players-unique\">—</div><div class=\"stat-sub\">Joueurs connectés actuellement</div><span class=\"stat-glyph\">✦</span></article>\n            <article class=\"stat-card\"><div class=\"stat-label\">VERSION</div><div class=\"stat-value version-value\" id=\"server-version\">1.21.11</div><div class=\"stat-sub\">Minecraft Java</div><span class=\"stat-glyph\">⌘</span></article>\n          </div>\n          <p class=\"stats-foot\" id=\"stats-updated\">Les compteurs se mettent à jour toutes les 60 secondes.</p>\n        </section>\n\n        <section class=\"join-strip\">\n          <div><span class=\"section-kicker\">TON AVENTURE COMMENCE ICI</span><h2>Prêt à partir à l’aventure ?</h2><p>Copie l’adresse du serveur et commence ta progression RPG.</p></div>\n          <button class=\"server-address copy-ip\" data-copy=\"play.aragonite.fr\"><span class=\"address-label\">ADRESSE DU SERVEUR</span><strong>play.aragonite.fr</strong><span class=\"copy-hint\">Cliquer pour copier</span></button>\n        </section>\n        <section class=\"feature-row\">\n          <article><span class=\"feature-icon\">⚔</span><div><h3>Choisis ta classe</h3><p>Guerrier, mage, archer, assassin ou paladin : trouve ton style de combat.</p></div></article>\n          <article><span class=\"feature-icon\">◇</span><div><h3>Progresse à ton rythme</h3><p>Gagne de l’XP et de l’or, complète des quêtes et améliore ton personnage.</p></div></article>\n          <article><span class=\"feature-icon\">✧</span><div><h3>Explore et affronte les boss</h3><p>Découvre les sites cachés de Dwarf City et pars en donjon, seul ou en groupe.</p></div></article>\n        </section>\n      </section>\n\n      <section id=\"page-wiki\" class=\"page content-page\" aria-labelledby=\"wiki-title\">\n        <div class=\"page-heading\"><div class=\"eyebrow\"><span class=\"eyebrow-line\"></span> CODEX D’ARAGONITE</div><h1 id=\"wiki-title\">Wiki <em>du royaume</em></h1><p>Classes, progression et exploration : tes premières clés pour l’aventure RPG.</p></div>\n        <div class=\"wiki-layout\">\n          <aside class=\"wiki-nav\"><span class=\"section-kicker\">DANS LE CODEX</span><a class=\"wiki-link selected\" href=\"#demarrer\">Bien démarrer</a><a class=\"wiki-link\" href=\"#classes\">Classes & progression</a><a class=\"wiki-link\" href=\"#quetes\">Quêtes à Valoria</a><a class=\"wiki-link\" href=\"#exploration\">Exploration & donjons</a></aside>\n          <div class=\"wiki-content\">\n            <article class=\"wiki-article\" id=\"demarrer\"><span class=\"article-index\">01 — PREMIERS PAS</span><h2>Du lobby à Dwarf City</h2><p>Rejoins Aragonite avec <strong>play.aragonite.fr</strong>, puis prends la boussole du lobby et sélectionne <strong>RPG – Karak Dûrn</strong>. Ton profil accompagne ton aventure : il conserve ta classe, ton niveau, ton XP, ton or et tes quêtes.</p><div class=\"callout\"><span>✦</span><p><strong>Ton guide en jeu</strong><br>Ouvre le menu RPG ou utilise <code>/rpgcore:rpg tutoriel</code> pour découvrir les commandes et les étapes de départ.</p></div></article>\n            <article class=\"wiki-article\" id=\"classes\"><span class=\"article-index\">02 — TON PERSONNAGE</span><h2>Classes & progression</h2><p>Choisis une classe qui correspond à ta façon de jouer. Chaque profil possède ses caractéristiques et ses compétences.</p><div class=\"tip-grid\"><div><span>01</span><strong>Guerrier</strong><small>Combat au corps à corps.</small></div><div><span>02</span><strong>Mage</strong><small>Attaques à distance et contrôle.</small></div><div><span>03</span><strong>Archer</strong><small>Précision et portée.</small></div><div><span>04</span><strong>Assassin</strong><small>Mobilité et attaques rapides.</small></div><div><span>05</span><strong>Paladin</strong><small>Résistance et soin.</small></div></div><p class=\"muted\">Commandes : <code>/rpgcore:rpg classe</code>, <code>/rpgcore:rpg stats</code> et <code>/rpgcore:rpg hud on</code>.</p></article>\n            <article class=\"wiki-article\" id=\"quetes\"><span class=\"article-index\">03 — QUÊTES ET RÉCOMPENSES</span><h2>Le chemin de Valoria</h2><p>À Valoria, rencontre <strong>Maëlle</strong> et aide-la à sécuriser le chemin du nord. Les quêtes font progresser ton personnage et peuvent te rapporter de l’XP et de l’or. Consulte ton objectif avec <code>/rpgcore:rpg quest</code>.</p><div class=\"callout\"><span>✦</span><p><strong>Équipe-toi</strong><br>La boutique RPG permet d’acheter et d’équiper des armes selon ton niveau. Vérifie les prérequis et ton solde avec les commandes du menu RPG.</p></div></article>\n            <article class=\"wiki-article\" id=\"exploration\"><span class=\"article-index\">04 — SITES CACHÉS ET DONJONS</span><h2>Explore Dwarf City</h2><p>Ouvre l’œil dans les biomes : des lieux dissimulés peuvent révéler des reliques ou l’entrée d’un donjon. Pars en expédition seul ou forme un groupe jusqu’à cinq joueurs pour affronter des vagues et leurs boss.</p><div class=\"tip-grid\"><div><span>✧</span><strong>Forêt sombre</strong><small>Sanctuaire des ronces et relique du guetteur.</small></div><div><span>✧</span><strong>Marais</strong><small>La crypte et ses créatures toxiques.</small></div><div><span>✧</span><strong>Pics escarpés</strong><small>L’observatoire et le Gardien de pierre.</small></div></div><p class=\"muted\">Pour les annonces, la compatibilité et l’aide, retrouve la communauté sur Discord.</p><a class=\"text-link\" href=\"https://discord.gg/5r7CCcNTKs\" target=\"_blank\" rel=\"noreferrer\">Consulter les annonces sur Discord</a></article>\n          </div>\n        </div>\n      </section>\n\n      <section id=\"page-vote\" class=\"page content-page vote-page\" aria-labelledby=\"vote-title\">\n        <div class=\"page-heading\"><div class=\"eyebrow\"><span class=\"eyebrow-line\"></span> FAIS GRANDIR LE ROYAUME</div><h1 id=\"vote-title\">Un vote. <em>Un vrai soutien.</em></h1><p>Chaque vote aide de nouveaux joueurs à découvrir Aragonite.</p></div>\n        <div class=\"vote-layout\">\n          <div class=\"vote-card\">\n            <img class=\"vote-emblem\" src=\"./discord-icon.png\" alt=\"\" width=\"76\" height=\"76\"><div class=\"vote-content\"><span class=\"section-kicker\">SOUTENIR ARAGONITE</span><h2>Vote et tente ta chance</h2><p>Entre ton pseudo Minecraft, vote sur la fiche Aragonite, puis vérifie ton vote ici pour débloquer la roue. Un vote validé donne droit à un lancer.</p>\n              <label class=\"vote-label\" for=\"vote-username\">Pseudo Minecraft</label>\n              <div class=\"vote-start-row\"><input id=\"vote-username\" name=\"username\" autocomplete=\"nickname\" maxlength=\"16\" placeholder=\"Ton pseudo en jeu\" aria-describedby=\"vote-message\"><button class=\"button button-primary\" id=\"vote-start\" type=\"button\">Préparer mon vote</button></div>\n              <p class=\"vote-message\" id=\"vote-message\" role=\"status\" aria-live=\"polite\"></p>\n              <a class=\"button button-quiet hidden\" id=\"vote-external\" href=\"https://serveur-prive.net/minecraft/aragonite\" target=\"_blank\" rel=\"noreferrer\">Ouvrir la page de vote</a>\n              <button class=\"button button-primary hidden\" id=\"vote-verify\" type=\"button\">J’ai voté — vérifier</button>\n              <div class=\"wheel-panel hidden\" id=\"wheel-panel\">\n                <div class=\"wheel-wrap\"><div class=\"wheel-pointer\"></div><div class=\"reward-wheel\" id=\"reward-wheel\"><span class=\"wheel-center\">A</span></div></div>\n                <div class=\"wheel-copy\"><span class=\"section-kicker\">VOTE VALIDÉ</span><h3>La roue t’attend</h3><p id=\"wheel-player\"></p><button class=\"button button-primary\" id=\"wheel-spin\" type=\"button\">Lancer la roue</button><p class=\"wheel-result\" id=\"wheel-result\" role=\"status\" aria-live=\"polite\"></p><div class=\"vote-meta\">Après le lancer, récupère ton lot en jeu avec <code>/vote</code>.</div></div>\n              </div>\n              <div class=\"vote-meta\">Le vote est vérifié par la plateforme partenaire. Les chances et le lot sont décidés côté serveur.</div>\n            </div>\n          </div>\n          <aside class=\"leaderboard-card\"><span class=\"section-kicker\">CLASSEMENT MENSUEL</span><h2>Top voteurs</h2><p>Les joueurs qui soutiennent le plus Aragonite ce mois-ci.</p><ol id=\"vote-leaderboard\" class=\"leaderboard-list\"><li class=\"leaderboard-empty\">Chargement du classement…</li></ol><small>Classement synchronisé avec Serveur-Privé.</small></aside>\n        </div>\n        <div class=\"reward-odds\"><span class=\"section-kicker\">LA ROUE ARAGONITE</span><div><span><i class=\"odds-chip chip-xp\"></i>100 XP <b>40 %</b></span><span><i class=\"odds-chip chip-xp2\"></i>250 XP <b>25 %</b></span><span><i class=\"odds-chip chip-gold\"></i>50 pièces d’or <b>20 %</b></span><span><i class=\"odds-chip chip-gold2\"></i>100 pièces d’or <b>10 %</b></span><span><i class=\"odds-chip chip-mix\"></i>100 XP + 100 pièces d’or <b>5 %</b></span></div></div>\n        <div class=\"vote-steps\"><div><span>01</span><h3>Saisis ton pseudo</h3><p>Utilise le pseudo Minecraft qui recevra le lot RPG.</p></div><div><span>02</span><h3>Vote sur la fiche</h3><p>Valide le captcha sur la page Serveur-Privé d’Aragonite.</p></div><div><span>03</span><h3>Lance la roue</h3><p>Après vérification, récupère ta récompense en jeu avec <code>/vote</code>.</p></div></div>\n      </section>\n    </main>\n\n    <footer class=\"footer\"><a class=\"brand\" href=\"#accueil\"><img class=\"brand-logo\" src=\"./discord-icon.png\" alt=\"\" width=\"34\" height=\"34\"><span>ARAGONITE</span></a><span>Serveur Minecraft</span><div><a href=\"#wiki\">Wiki</a><a href=\"#vote\">Vote</a><a href=\"https://discord.gg/5r7CCcNTKs\" target=\"_blank\" rel=\"noreferrer\">Discord</a></div></footer>\n  </div>\n  <div class=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n</body>\n</html>\n\r\n","css":"@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');\n:root{color-scheme:dark;--bg:#0a0e14;--panel:#101720;--panel2:#121b25;--line:#24303c;--text:#f2f5f7;--muted:#9ba8b3;--cyan:#7de3ec;--gold:#ffc46b;--mono:'DM Mono',monospace;--sans:'Manrope',sans-serif}\n*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--sans);font-size:16px}a{color:inherit;text-decoration:none}button{font:inherit}.site-shell{max-width:1440px;margin:0 auto;padding:0 6.2%}.topbar{height:82px;display:flex;align-items:center;border-bottom:1px solid #ffffff11;gap:42px}.brand{display:flex;align-items:center;gap:11px;font-size:13px;font-weight:800;letter-spacing:.13em}.brand-mark{width:31px;height:34px;display:grid;place-items:center;color:var(--bg);background:var(--cyan);font-size:19px;font-weight:800;clip-path:polygon(50% 0,95% 22%,95% 78%,50% 100%,5% 78%,5% 22%)}.brand-dot{color:var(--cyan)}.nav{display:flex;gap:34px;margin-left:auto;height:100%;align-items:center}.nav a{height:100%;display:flex;align-items:center;position:relative;color:#a9b3bc;font-size:14px}.nav a:hover,.nav a.active{color:#fff}.nav a.active:after{content:\"\";position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--cyan)}.discord-top{border:1px solid #34414d;padding:11px 16px;border-radius:4px;font-size:13px}.discord-top:hover{border-color:var(--cyan)}.discord-top span{color:var(--cyan);margin-left:8px}.menu-toggle{display:none;background:none;border:0;color:white;font-size:22px}\n.hero{min-height:520px;position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;overflow:hidden;border-bottom:1px solid #ffffff10}.hero-grid{position:absolute;inset:0;background-image:linear-gradient(#1b293330 1px,transparent 1px),linear-gradient(90deg,#1b293330 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(90deg,transparent,#000 70%);opacity:.3}.hero-copy{position:relative;z-index:2;padding:58px 0}.eyebrow,.section-kicker,.article-index{font:500 11px var(--mono);letter-spacing:.16em;color:var(--cyan)}.eyebrow{display:flex;align-items:center;gap:10px}.eyebrow-line{width:26px;height:1px;background:var(--cyan)}h1{font-size:clamp(42px,5.1vw,72px);line-height:1.08;letter-spacing:-.055em;margin:25px 0 20px;font-weight:700}h1 em{font-style:normal;color:var(--cyan)}.hero-text{max-width:480px;color:#b1bbc4;line-height:1.8;font-size:16px;margin:0 0 29px}.hero-actions{display:flex;align-items:center;gap:13px;flex-wrap:wrap}.button{display:inline-flex;align-items:center;justify-content:center;gap:11px;border:1px solid transparent;padding:14px 18px;border-radius:3px;font-weight:700;font-size:13px;cursor:pointer;transition:.2s}.button-primary{background:var(--cyan);color:#071014}.button-primary:hover{background:#a4f3f7;transform:translateY(-1px)}.button-quiet{border-color:#34414d;color:#e4ebef}.button-quiet:hover{border-color:var(--cyan)}.button-icon{font-size:19px;font-weight:400}.hero-version{font:11px var(--mono);color:#9daab5;letter-spacing:.08em;margin-top:27px}.hero-version strong{color:#eef5f7;font-weight:500}.separator{padding:0 9px;color:#495762}.live-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#73e8ab;box-shadow:0 0 12px #73e8ab77;margin-right:7px;vertical-align:1px}.hero-art{height:430px;position:relative;display:grid;place-items:center}.orb{position:absolute;border:1px solid #7de3ec2a;border-radius:50%;transform:rotate(-28deg)}.orb-one{width:360px;height:142px}.orb-two{width:410px;height:190px;transform:rotate(48deg)}.crystal{position:absolute;clip-path:polygon(50% 0,100% 29%,82% 100%,18% 100%,0 29%)}.crystal-back{width:222px;height:280px;background:linear-gradient(145deg,#b5ffff 0%,#42bdcf 18%,#176276 48%,#102531 75%);filter:drop-shadow(0 12px 55px #1db6ce55);opacity:.8}.crystal-front{width:152px;height:225px;transform:translate(55px,24px);background:linear-gradient(135deg,#d5ffff 0%,#60d7e1 22%,#187f91 54%,#0c1c29 90%);clip-path:polygon(50% 0,100% 27%,78% 100%,0 69%,13% 25%);opacity:.88}.hero-rune{position:absolute;font:130px Georgia,serif;color:#d8ffff33;transform:translate(-120px,-110px)}.art-caption{position:absolute;bottom:12px;right:5%;font:11px var(--mono);letter-spacing:.16em;text-align:right;color:#d9eef0}.art-caption small{display:block;color:#77919d;margin-top:7px;font-size:9px}.hero-index{position:absolute;bottom:25px;right:0;color:var(--cyan);font:11px var(--mono)}.hero-index span{color:#52616d;padding:0 6px}\n.stats-wrap{padding:60px 0 53px}.stats-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:23px}.stats-head h2,.join-strip h2{font-size:25px;letter-spacing:-.04em;margin:9px 0 0}.refresh-note{font:11px var(--mono);color:#8d9aa5}.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.stat-card{position:relative;min-height:135px;padding:21px 20px;background:var(--panel);border:1px solid #ffffff0d;overflow:hidden}.stat-label{font:10px var(--mono);letter-spacing:.13em;color:#8d9ba6}.stat-value{font-size:32px;line-height:1.3;font-weight:700;letter-spacing:-.045em;margin-top:12px}.stat-total{font-size:16px;color:#81909c;font-weight:500;letter-spacing:0}.stat-sub{font-size:12px;color:#8795a0;margin-top:4px}.stat-glyph{position:absolute;right:16px;top:22px;color:#7de3ec35;font-size:25px}.stat-status .stat-value{font-size:25px}.version-value{font:23px var(--mono);letter-spacing:-.04em}.stats-foot{font:11px var(--mono);color:#64737f;margin:13px 0 0}.join-strip{padding:34px 0;border-top:1px solid #ffffff12;border-bottom:1px solid #ffffff12;display:flex;align-items:center;justify-content:space-between;gap:25px}.join-strip p{margin:9px 0 0;color:#96a3ad;font-size:14px}.server-address{display:flex;flex-direction:column;align-items:flex-start;min-width:260px;padding:15px 18px;background:#121b24;border:1px solid #293845;border-radius:3px;color:white;cursor:pointer;text-align:left}.address-label,.copy-hint{font:10px var(--mono);letter-spacing:.08em;color:#80919c}.server-address strong{font:16px var(--mono);color:var(--cyan);margin:6px 0}.copy-hint{font-size:9px}.feature-row{display:grid;grid-template-columns:repeat(3,1fr);padding:42px 0 54px;gap:30px}.feature-row article{display:flex;gap:15px}.feature-icon{color:var(--gold);font-size:22px}.feature-row h3{margin:0 0 7px;font-size:14px}.feature-row p{margin:0;color:#8f9ba5;line-height:1.65;font-size:13px}\n.content-page{min-height:68vh;padding:74px 0 80px}.page-heading{text-align:center;margin:8px auto 53px}.page-heading .eyebrow{justify-content:center}.page-heading h1{font-size:clamp(42px,5vw,64px);margin:18px 0 13px}.page-heading>p{color:#a6b1b9;margin:0;font-size:15px}.wiki-layout{display:grid;grid-template-columns:220px 1fr;gap:62px;max-width:1050px;margin:auto}.wiki-nav{position:sticky;top:25px;align-self:start;border-left:1px solid #2b3943;padding:4px 0 4px 19px;display:flex;flex-direction:column;gap:18px}.wiki-nav .section-kicker{margin-bottom:5px}.wiki-link{font-size:13px;color:#8795a0}.wiki-link:hover,.wiki-link.selected{color:var(--cyan)}.wiki-article{padding:0 0 39px;margin-bottom:36px;border-bottom:1px solid #ffffff15;scroll-margin-top:30px}.article-index{font-size:10px;color:#84939e}.wiki-article h2{font-size:25px;letter-spacing:-.04em;margin:11px 0 12px}.wiki-article p{font-size:14px;line-height:1.85;color:#a7b2bb;margin:0 0 15px}.wiki-article strong{color:#eef4f6}.callout{display:flex;gap:15px;padding:17px;background:#111c23;border:1px solid #20343b;border-left:2px solid var(--cyan);margin-top:19px}.callout>span{font-size:20px;color:var(--cyan)}.callout p{margin:0;font-size:13px}.command-list{border:1px solid #27343e;margin:20px 0}.command-list div{display:flex;gap:22px;padding:14px 16px;border-bottom:1px solid #27343e}.command-list div:last-child{border:0}.command-list code{min-width:110px;color:var(--cyan);font:13px var(--mono)}.command-list span{color:#a4afb8;font-size:13px}.muted{color:#778691!important;font-size:12px!important}.tip-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:22px}.tip-grid div{background:var(--panel);border:1px solid #ffffff0d;padding:15px;display:flex;flex-direction:column;gap:8px}.tip-grid span{font:10px var(--mono);color:var(--cyan)}.tip-grid strong{font-size:13px}.tip-grid small{font-size:11px;line-height:1.5;color:#8997a2}.text-link{color:var(--cyan);font-size:13px;font-weight:700}.text-link span{padding-left:8px}.vote-card{max-width:780px;margin:auto;display:flex;gap:30px;align-items:center;background:linear-gradient(125deg,#14232b,#101720 62%);border:1px solid #2b424b;padding:35px}.vote-emblem{flex:0 0 92px;height:106px;display:grid;place-items:center;background:#7de3ec;color:#0a1418;clip-path:polygon(50% 0,95% 23%,95% 77%,50% 100%,5% 77%,5% 23%);font-size:46px;font-weight:800}.vote-content h2{font-size:23px;margin:9px 0}.vote-content p{color:#a6b1ba;font-size:14px;line-height:1.75;max-width:550px;margin:0 0 18px}.vote-meta{margin-top:15px;color:#75838f;font:10px var(--mono)}.vote-steps{max-width:900px;margin:45px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:25px}.vote-steps>div{border-top:1px solid #35434d;padding-top:15px}.vote-steps span{font:11px var(--mono);color:var(--cyan)}.vote-steps h3{font-size:14px;margin:12px 0 7px}.vote-steps p{color:#8996a0;font-size:12px;line-height:1.7;margin:0}\n.footer{border-top:1px solid #ffffff17;min-height:84px;display:flex;align-items:center;justify-content:space-between;gap:18px;color:#83909a;font-size:11px}.footer>span{font:10px var(--mono);letter-spacing:.06em}.footer>div{display:flex;gap:20px}.footer>div a:hover{color:var(--cyan)}.toast{position:fixed;bottom:24px;left:50%;transform:translate(-50%,20px);background:#d4fbfc;color:#071014;padding:11px 17px;border-radius:3px;font-size:13px;font-weight:700;opacity:0;pointer-events:none;transition:.2s;z-index:9}.toast.show{opacity:1;transform:translate(-50%,0)}\n.page{display:none}.page.active{display:block}.content-page.page.active{display:block}\n@media(max-width:850px){.site-shell{padding:0 5%}.hero{grid-template-columns:1fr;min-height:590px}.hero-copy{padding:64px 0 25px}.hero-art{position:absolute;right:-60px;top:160px;width:46%;height:320px;opacity:.44}.hero-copy{max-width:620px}.hero-index{bottom:18px}.stats-grid{grid-template-columns:repeat(2,1fr)}.wiki-layout{grid-template-columns:170px 1fr;gap:32px}}\n@media(max-width:600px){.site-shell{padding:0 20px}.topbar{height:70px;gap:12px}.brand{font-size:11px}.nav{display:none;position:absolute;top:69px;left:0;right:0;height:auto;background:#0c1219;border-bottom:1px solid var(--line);padding:14px 20px;z-index:5;flex-direction:column;align-items:stretch;gap:0}.nav.open{display:flex}.nav a{height:auto;padding:13px 0}.nav a.active:after{display:none}.discord-top{margin-left:auto;padding:9px 11px;font-size:11px}.menu-toggle{display:block}.hero{min-height:560px}.hero-copy{padding:51px 0}.hero-art{right:-100px;top:205px;width:65%;opacity:.3}.hero-text{font-size:14px}.hero-actions{align-items:stretch;flex-direction:column;max-width:290px}.hero-actions .button{width:100%}.hero-version{font-size:9px}.stats-wrap{padding:43px 0}.stats-head{align-items:flex-start;flex-direction:column;gap:13px}.stats-head h2{font-size:22px}.stats-grid{gap:8px}.stat-card{min-height:120px;padding:15px 12px}.stat-label{font-size:8px;letter-spacing:.09em}.stat-value{font-size:27px}.stat-status .stat-value{font-size:21px}.stat-sub{font-size:10px}.stat-glyph{top:14px;right:10px}.join-strip{align-items:stretch;flex-direction:column;padding:27px 0}.join-strip h2{font-size:22px}.server-address{min-width:0;width:100%}.feature-row{grid-template-columns:1fr;padding:31px 0;gap:23px}.content-page{padding:54px 0}.page-heading{margin-bottom:37px}.page-heading h1{font-size:43px}.page-heading>p{font-size:13px;line-height:1.7}.wiki-layout{grid-template-columns:1fr;gap:30px}.wiki-nav{position:static;display:grid;grid-template-columns:1fr 1fr;gap:12px;border-left:0;border-bottom:1px solid var(--line);padding:0 0 17px}.wiki-nav .section-kicker{grid-column:1/-1}.wiki-link{font-size:11px}.wiki-article h2{font-size:22px}.command-list div{gap:9px;padding:13px 10px}.command-list code{min-width:90px;font-size:11px}.command-list span{font-size:11px}.tip-grid{grid-template-columns:1fr}.vote-card{padding:24px 19px;gap:18px;align-items:flex-start}.vote-emblem{flex-basis:57px;height:68px;font-size:30px}.vote-content h2{font-size:19px}.vote-content p{font-size:12px}.vote-steps{grid-template-columns:1fr;gap:20px;margin-top:32px}.footer{padding:20px 0;align-items:flex-start;flex-wrap:wrap}.footer>span{order:3;width:100%}.footer>div{gap:13px;font-size:10px}}\n@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition:none!important}}\n.vote-layout{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.55fr) minmax(260px,.85fr);gap:18px;align-items:stretch}.vote-layout .vote-card{max-width:none;margin:0}.vote-layout .vote-emblem{align-self:flex-start}.vote-content{flex:1;min-width:0}.vote-label{display:block;color:#aab7c0;font-size:12px;margin:16px 0 7px}.vote-start-row{display:flex;gap:9px;align-items:stretch}.vote-start-row input{min-width:0;flex:1;background:#0b1118;border:1px solid #31434d;color:#fff;border-radius:3px;padding:12px 13px;font:14px var(--mono)}.vote-start-row input:focus{outline:1px solid var(--cyan);border-color:var(--cyan)}.vote-start-row .button{white-space:nowrap}.vote-message{min-height:18px;color:#ffc46b;font-size:12px;margin:10px 0}.vote-message.success{color:#73e8ab}.vote-message.error{color:#ff9a8f}.hidden{display:none!important}.leaderboard-card{padding:27px 24px;background:#101720;border:1px solid #2b424b}.leaderboard-card h2{margin:8px 0;font-size:23px}.leaderboard-card>p{color:#95a3ad;font-size:12px;line-height:1.65;margin:0 0 17px}.leaderboard-card>small{display:block;color:#687984;font:10px var(--mono);margin-top:16px}.leaderboard-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px}.leaderboard-list li{display:grid;grid-template-columns:31px 1fr auto;align-items:center;gap:10px;padding:11px 8px;border-bottom:1px solid #ffffff10;font-size:12px}.leaderboard-list li:first-child .rank{color:var(--gold)}.rank{font:11px var(--mono);color:#72828c}.leader-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.leader-votes{font:11px var(--mono);color:var(--cyan)}.leaderboard-empty{color:#81909b!important;grid-template-columns:1fr!important}.reward-odds{max-width:1000px;margin:24px auto 0;padding:18px 20px;background:#0f161d;border:1px solid #ffffff10}.reward-odds>div{display:flex;flex-wrap:wrap;gap:10px 20px;margin-top:13px}.reward-odds>div>span{display:flex;align-items:center;gap:8px;color:#b7c1c8;font-size:11px}.reward-odds b{font:10px var(--mono);color:#e8f4f5}.odds-chip{width:9px;height:9px;display:inline-block;border-radius:50%}.chip-xp{background:#55d5dc}.chip-xp2{background:#258da5}.chip-gold{background:#d5b254}.chip-gold2{background:#eb835d}.chip-mix{background:#bc6dbe}.vote-steps code{color:var(--cyan);font:11px var(--mono)}.wheel-panel{display:flex;align-items:center;gap:23px;padding:20px;margin:17px 0;background:#0a1117;border:1px solid #29414a}.wheel-wrap{position:relative;flex:0 0 170px;width:170px;height:170px}.reward-wheel{width:100%;height:100%;border-radius:50%;border:5px solid #d3fbfc;background:conic-gradient(#55d5dc 0 40%,#258da5 40% 65%,#d5b254 65% 85%,#eb835d 85% 95%,#bc6dbe 95%);box-shadow:0 0 0 5px #18333a,0 0 35px #35bbca35;transition:transform 5s cubic-bezier(.12,.75,.1,1);display:grid;place-items:center}.wheel-center{width:43px;height:43px;border-radius:50%;display:grid;place-items:center;background:#0a1117;color:#c9fbfc;font-weight:800;border:1px solid #ffffff50}.wheel-pointer{position:absolute;z-index:2;left:calc(50% - 9px);top:-8px;width:0;height:0;border-left:9px solid transparent;border-right:9px solid transparent;border-top:20px solid var(--gold);filter:drop-shadow(0 2px 3px #000)}.wheel-copy h3{margin:6px 0 5px;font-size:19px}.wheel-copy>p{color:#91a0aa;font-size:12px;margin:5px 0 12px}.wheel-copy .wheel-result{color:var(--cyan);font-size:14px;font-weight:700;min-height:20px}.wheel-copy .vote-meta{line-height:1.7;margin-top:9px}\n@media(max-width:820px){.vote-layout{grid-template-columns:1fr}.leaderboard-card{padding:22px}.wheel-panel{gap:15px}.wheel-wrap{flex-basis:145px;width:145px;height:145px}}\n@media(max-width:600px){.vote-start-row{flex-direction:column}.vote-start-row .button{width:100%}.vote-layout .vote-card{padding:20px 16px;gap:15px}.vote-layout .vote-emblem{flex-basis:48px;height:58px;font-size:25px}.wheel-panel{flex-direction:column;align-items:stretch}.wheel-wrap{align-self:center}.wheel-copy{text-align:center}.reward-odds>div{flex-direction:column;gap:11px}.vote-steps{margin-top:30px}}\n\n.brand-logo{width:34px;height:34px;border-radius:9px;object-fit:cover;display:block}.vote-emblem{border-radius:18px;object-fit:cover;flex:0 0 auto}\r\n","app":"const API_URL = \"https://api.mcsrvstat.us/3/play.aragonite.fr\";\nconst REFRESH_MS = 60000;\nconst $ = (id) => document.getElementById(id);\n\nasync function refreshStatus() {\n  const state = $(\"server-state\");\n  try {\n    const response = await fetch(API_URL, { cache: \"no-store\" });\n    if (!response.ok) throw new Error(\"status\");\n    const data = await response.json();\n    if (data.online) {\n      const online = Number(data.players?.online ?? 0);\n      $(\"players-online\").textContent = online.toLocaleString(\"fr-FR\");\n      $(\"players-unique\").textContent = online.toLocaleString(\"fr-FR\");\n      $(\"players-max\").textContent = Number(data.players?.max ?? 0).toLocaleString(\"fr-FR\");\n      $(\"server-version\").textContent = data.version || \"Minecraft\";\n      state.textContent = \"En ligne\";\n      state.style.color = \"#73e8ab\";\n      $(\"server-sub\").textContent = data.motd?.clean?.[0] || \"Le serveur répond au ping\";\n      $(\"stats-updated\").textContent = \"Statut vérifié à \" + new Date().toLocaleTimeString(\"fr-FR\", {hour:\"2-digit\",minute:\"2-digit\"}) + \" · Actualisation chaque minute.\";\n    } else {\n      $(\"players-online\").textContent = \"0\";\n      $(\"players-unique\").textContent = \"0\";\n      $(\"players-max\").textContent = \"—\";\n      state.textContent = \"Hors ligne\";\n      state.style.color = \"#ff8b80\";\n      $(\"server-sub\").textContent = \"Le serveur ne répond pas actuellement\";\n      $(\"stats-updated\").textContent = \"Dernière vérification : \" + new Date().toLocaleTimeString(\"fr-FR\", {hour:\"2-digit\",minute:\"2-digit\"}) + \" · Nouvelle tentative dans 60 s.\";\n    }\n  } catch {\n    state.textContent = \"Indisponible\";\n    state.style.color = \"#ffc46b\";\n    $(\"server-sub\").textContent = \"Impossible de récupérer le statut en direct\";\n    $(\"stats-updated\").textContent = \"Vérifie directement dans Minecraft · Nouvelle tentative dans 60 s.\";\n  }\n}\n\nfunction route() {\n  const page = location.hash.slice(1) || \"accueil\";\n  const allowed = [\"accueil\", \"wiki\", \"vote\"];\n  const current = allowed.includes(page) ? page : \"accueil\";\n  document.querySelectorAll(\".page\").forEach((element) => {\n    const active = element.id === \"page-\" + current;\n    element.classList.toggle(\"active\", active);\n    element.setAttribute(\"aria-hidden\", String(!active));\n  });\n  document.querySelectorAll(\".nav [data-route]\").forEach((link) => {\n    const active = link.dataset.route === current;\n    link.classList.toggle(\"active\", active);\n    if (active) link.setAttribute(\"aria-current\", \"page\");\n    else link.removeAttribute(\"aria-current\");\n  });\n  document.querySelector(\".nav\").classList.remove(\"open\");\n  document.querySelector(\".menu-toggle\").setAttribute(\"aria-expanded\", \"false\");\n  window.scrollTo({top:0,behavior:\"smooth\"});\n}\n\nwindow.addEventListener(\"hashchange\", route);\nroute();\nrefreshStatus();\nsetInterval(refreshStatus, REFRESH_MS);\n\nconst toast = document.querySelector(\".toast\");\nlet toastTimer;\ndocument.querySelectorAll(\".copy-ip\").forEach((button) => button.addEventListener(\"click\", async () => {\n  try {\n    await navigator.clipboard.writeText(button.dataset.copy);\n    toast.textContent = \"Adresse copiée : \" + button.dataset.copy;\n  } catch {\n    toast.textContent = \"Adresse du serveur : \" + button.dataset.copy;\n  }\n  toast.classList.add(\"show\");\n  clearTimeout(toastTimer);\n  toastTimer = setTimeout(() => toast.classList.remove(\"show\"), 2400);\n}));\ndocument.querySelector(\".menu-toggle\").addEventListener(\"click\", (event) => {\n  const open = document.querySelector(\".nav\").classList.toggle(\"open\");\n  event.currentTarget.setAttribute(\"aria-expanded\", String(open));\n});\n\nconst voteMessage = $(\"vote-message\");\nconst voteStart = $(\"vote-start\");\nconst voteExternal = $(\"vote-external\");\nconst voteVerify = $(\"vote-verify\");\nconst wheelPanel = $(\"wheel-panel\");\nconst wheelButton = $(\"wheel-spin\");\nconst wheel = $(\"reward-wheel\");\nconst wheelResult = $(\"wheel-result\");\nconst voteHandleKey = \"aragonite-vote-session\";\n\nfunction showVoteMessage(message, tone = \"\") {\n  voteMessage.textContent = message;\n  voteMessage.className = \"vote-message\" + (tone ? \" \" + tone : \"\");\n}\n\nasync function jsonRequest(path, options = {}) {\n  const response = await fetch(path, {\n    credentials: \"same-origin\",\n    ...options,\n    headers: { \"content-type\": \"application/json\", ...(options.headers || {}) },\n  });\n  const data = await response.json().catch(() => ({}));\n  if (!response.ok) throw new Error(data.message || \"Le service de vote est momentanément indisponible.\");\n  return data;\n}\n\nasync function loadVoteLeaderboard() {\n  const list = $(\"vote-leaderboard\");\n  try {\n    const data = await jsonRequest(\"/api/vote/leaderboard\", { method: \"GET\", headers: {} });\n    list.replaceChildren();\n    if (!data.entries?.length) {\n      const empty = document.createElement(\"li\");\n      empty.className = \"leaderboard-empty\";\n      empty.textContent = \"Aucun vote pour le moment.\";\n      list.append(empty);\n      return;\n    }\n    for (const entry of data.entries.slice(0, 10)) {\n      const row = document.createElement(\"li\");\n      const rank = document.createElement(\"span\");\n      rank.className = \"rank\";\n      rank.textContent = String(entry.rank).padStart(2, \"0\");\n      const name = document.createElement(\"span\");\n      name.className = \"leader-name\";\n      name.textContent = entry.username;\n      const votes = document.createElement(\"span\");\n      votes.className = \"leader-votes\";\n      votes.textContent = entry.votes + (entry.votes === 1 ? \" vote\" : \" votes\");\n      row.append(rank, name, votes);\n      list.append(row);\n    }\n  } catch (error) {\n    list.replaceChildren();\n    const empty = document.createElement(\"li\");\n    empty.className = \"leaderboard-empty\";\n    empty.textContent = error.message;\n    list.append(empty);\n  }\n}\n\nfunction showSpinStatus(data) {\n  wheelPanel.classList.remove(\"hidden\");\n  $(\"wheel-player\").textContent = \"Récompense liée à \" + data.username + \".\";\n  if (data.spun) {\n    wheelButton.classList.add(\"hidden\");\n    wheelResult.textContent = data.reward_label + \" · lot prêt en jeu avec /vote\";\n  } else {\n    wheelButton.classList.remove(\"hidden\");\n    wheelResult.textContent = \"\";\n  }\n}\n\nasync function loadVoteStatus() {\n  try {\n    const data = await jsonRequest(\"/api/vote/status\", { method: \"GET\", headers: {} });\n    if (data.verified) {\n      showSpinStatus(data);\n      voteVerify.classList.add(\"hidden\");\n      voteExternal.classList.add(\"hidden\");\n      showVoteMessage(\"Vote vérifié pour \" + data.username + \".\", \"success\");\n    }\n  } catch {}\n}\n\nvoteStart.addEventListener(\"click\", async () => {\n  const username = $(\"vote-username\").value.trim();\n  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {\n    showVoteMessage(\"Entre un pseudo Minecraft valide de 3 à 16 caractères.\", \"error\");\n    $(\"vote-username\").focus();\n    return;\n  }\n  voteStart.disabled = true;\n  showVoteMessage(\"Préparation du vote sécurisé…\");\n  try {\n    const data = await jsonRequest(\"/api/vote/start\", {\n      method: \"POST\",\n      body: JSON.stringify({ username }),\n    });\n    sessionStorage.setItem(voteHandleKey, data.sessionHandle);\n    voteExternal.href = data.voteUrl;\n    voteExternal.classList.remove(\"hidden\");\n    voteVerify.classList.remove(\"hidden\");\n    showVoteMessage(\"Ouvre la page Serveur-Privé, vote avec le même pseudo, puis reviens cliquer sur « vérifier ».\");\n  } catch (error) {\n    showVoteMessage(error.message, \"error\");\n  } finally {\n    voteStart.disabled = false;\n  }\n});\n\nvoteVerify.addEventListener(\"click\", async () => {\n  const sessionHandle = sessionStorage.getItem(voteHandleKey);\n  if (!sessionHandle) {\n    showVoteMessage(\"Prépare d’abord ton vote avec ton pseudo Minecraft.\", \"error\");\n    return;\n  }\n  voteVerify.disabled = true;\n  showVoteMessage(\"Vérification du vote auprès de Serveur-Privé…\");\n  try {\n    const data = await jsonRequest(\"/api/vote/verify\", {\n      method: \"POST\",\n      body: JSON.stringify({ sessionHandle }),\n    });\n    sessionStorage.removeItem(voteHandleKey);\n    showVoteStatusAfterVerify(data);\n  } catch (error) {\n    showVoteMessage(error.message, \"error\");\n  } finally {\n    voteVerify.disabled = false;\n  }\n});\n\nfunction showVoteStatusAfterVerify(data) {\n  showSpinStatus({ ...data, spun: false });\n  voteVerify.classList.add(\"hidden\");\n  voteExternal.classList.add(\"hidden\");\n  showVoteMessage(\"Vote confirmé pour \" + data.username + \". Tu as un lancer.\", \"success\");\n}\n\nwheelButton.addEventListener(\"click\", async () => {\n  wheelButton.disabled = true;\n  wheelResult.textContent = \"La roue tourne…\";\n  try {\n    const data = await jsonRequest(\"/api/vote/spin\", { method: \"POST\", body: \"{}\" });\n    const centers = [72, 162, 270, 324, 351];\n    const rotation = 7 * 360 + 360 - centers[data.reward_index];\n    wheel.style.transform = \"rotate(\" + rotation + \"deg)\";\n    window.setTimeout(() => {\n      wheelButton.classList.add(\"hidden\");\n      wheelResult.textContent = \"Tu as gagné \" + data.reward_label + \" ! Connecte-toi et tape /vote en jeu.\";\n      $(\"wheel-player\").textContent = \"Récompense obtenue par \" + data.username + \".\";\n      showVoteMessage(\"Ton lot t’attend en jeu avec /vote.\", \"success\");\n    }, 5100);\n  } catch (error) {\n    wheelResult.textContent = \"\";\n    showVoteMessage(error.message, \"error\");\n    wheelButton.disabled = false;\n  }\n});\n\nloadVoteLeaderboard();\nloadVoteStatus();\n"};
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
