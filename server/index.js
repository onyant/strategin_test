const express = require('express');
const app = express();
const path = require('path');
const connectToDatabase = require('./bd');
const User = require('./models/user');
const mongoose = require('mongoose'); // Ajout de l'importation de Mongoose

const port = 5000;

const startServer = async () => {
  try {
    // Connexion à la base de données
    await connectToDatabase();

    // Créez un nouvel utilisateur
    const newUser = new User({
      email: 'john.doe@example.com',
      password :'njkdfsd'
    });

    // Sauvegardez l'utilisateur dans la base de données
    const savedUser = await newUser.save();
    console.log('Utilisateur sauvegardé:', savedUser);

    // Configuration de la route pour le fichier index.html
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    // Démarrage du serveur
    app.listen(port, () => {
      console.log('Serveur express démarré sur le port:', port);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
  }
};

// Appel de la fonction pour démarrer le serveur
startServer();