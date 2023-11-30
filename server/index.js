const express = require('express');
const app = express();
const path = require('path');
const connectToDatabase = require('./bd');
const User = require('./models/user');
const apiRoutes = require('./routes/apiRoutes');

// Middleware pour analyser les données JSON du corps de la requête
app.use(express.json());

// Utilisez vos routes API
app.use('/api', apiRoutes);

// ... Autres routes et middleware ...

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

    // Configuration de la route 
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    const port = 5000;
    // Demarrage du serveur
    app.listen(port, () => {
      console.log('Serveur express démarré sur le port:', port);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
  }
};

startServer();
