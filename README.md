# EVENT

Ce projet est une application de gestion d'événements, permettant de créer, modifier, et supprimer des événements, ainsi que de gérer les inscriptions des participants. Le backend utilise Node.js et Express, tandis que les données sont stockées dans MySQL et MongoDB.
(Projet de formation pour Master chez Livecampus pour le cours Accès aux données JS)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-utilisateur/event.git
   ```
   ```bash
   cd event
   ```
2. **Installer les dépendances** :

   ```bash
   npm i
   ```

3. **Configurer les Variables d'Environnement** :

Créez un fichier .env dans le dossier /src et ajoutez les configurations nécessaires pour MySQL et MongoDB.
   ```bash
   cd src
   ```
   ```bash
      # MySQL
      HOST_SQL=localhost
      USER_SQL=votre-utilisateur
      PASSWORD_SQL=motdepasse
      DB_SQL= "events"
      
      # MongoDB
      MONGODB_URI=mongodb://localhost:27017/nom-de-la-base-mongodb
      
      # Port
      PORT=3001
   ```
4. **Créer les Bases de Données et les Tables** :

Assurez-vous que MySQL et MongoDB sont en cours d'exécution ainsi que vous êtes bien positionné à la racine du projet.
   ```bash
   node init_db.js
   ```
5. **Ajoutez la data dans les Bases** :
   ```bash
    cd src
   ```
   ```bash
    node index.js
   ```
6. **Lancez le projet** :
   ```bash
    node server.js
   ```
   
Le serveur sera démarré et accessible à l'adresse http://localhost:3001.

## Accéder au Visuel :

- **Page Principale** : Pour accéder à la liste des événements, ouvrez votre navigateur et rendez-vous sur : http://localhost:3001/api/events
- **Édition d’un Événement** : Cliquez sur un événement pour accéder à la page de modification et de gestion des participants.
## Fonctionnalités
- **Afficher les événements** : Liste tous les événements avec les détails stockés dans MongoDB et MySQL.
- **Modifier les événements** : Mise à jour des informations de chaque événement via MySQL.
- **Gérer les inscriptions** : Ajouter ou supprimer des participants d’un événement.
- **Supprimer des événements** : Supprimer des événements de la base de données MySQL.
## Technologies Utilisées
- **Backend** : Node.js, Express
- **Bases de Données** : MySQL pour la gestion des événements, MongoDB pour les données additionnelles
- **Vue** : EJS pour le rendu côté serveur
- **CSS** : Tailwind CSS pour le style
## Dépannage
- **Problèmes de Connexion à MySQL ou MongoDB** : Vérifiez les paramètres dans le fichier .env, que .env soit bien placé dans le dossier src/ et assurez-vous que les services MySQL et MongoDB sont actifs.
- **Erreurs de Migration** : Assurez-vous que les scripts SQL pour créer les tables et les procédures stockées ont été exécutés.
