# AragoniteVote

Plugin Paper pour récupérer en jeu les récompenses obtenues sur la page de vote Aragonite avec `/vote`.

## Compilation

Avec un JDK 25 et Maven, depuis ce dossier :

```sh
mvn package
```

Le JAR compilé est `target/aragonite-vote-plugin-1.0.0.jar`.

## Installation et configuration

1. Installe `RPGCore`, qui doit exposer le service `fr.aragonite.rpg.core.RpgCoreApi` et sa méthode `applyVoteReward(Player, String, long, long, Consumer<Boolean>)`. La méthode doit dédupliquer les récompenses avec le `claimId` et confirmer le callback uniquement après la sauvegarde.
2. Copie le JAR dans le dossier `plugins/` du serveur Paper et démarre le serveur.
3. Configure `plugins/AragoniteVote/config.yml` :
   - `site-url` : URL publique du site Aragonite hébergeant l’API `/api/game`.
   - `api-key` : même secret que la variable `GAME_API_KEY` du service web. Configure-le côté serveur et ne le publie pas.
4. Redémarre le serveur. Après avoir validé le vote et lancé la roue sur le site, les joueurs peuvent réclamer le lot avec `/vote`.

Le service web n’est confirmé qu’après la sauvegarde du lot dans RPGCore. Si le profil RPG n’est pas disponible, le plugin libère le lot pour une nouvelle tentative.
