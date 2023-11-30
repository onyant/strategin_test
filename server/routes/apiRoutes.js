const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');

// Exemple de route pour la connexion
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Recherchez l'utilisateur dans la base de données
      const user = await User.findOne({ email, password });
  
      if (user) {
        // Générer un token avec l'ID de l'utilisateur
        const token = jwt.sign({ userId: user._id }, 'votre_secret_key_secrete', { expiresIn: '1h' });
  
        // L'utilisateur est authentifié, renvoyez le token
        res.json({ success: true, message: 'Connexion réussie', token });
      } else {
        // L'utilisateur n'est pas authentifié
        res.status(401).json({ success: false, message: 'Identifiants invalides' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur:', error);
      res.status(500).json({ success: false, error: 'Erreur serveur lors de la connexion' });
    }
  });
router.post('/users', async (req, res) => {
    try {
      // Récupérer les données du corps de la requête
      const { email, password } = req.body;
  
      // Créer un nouvel utilisateur
      const newUser = new User({ email, password });
  
      // Sauvegarder l'utilisateur dans la base de données
      const savedUser = await newUser.save();
  
      // Répondez avec les données de l'utilisateur sauvegardé
      res.json(savedUser);
    } catch (error) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'insertion de l\'utilisateur' });
    }
  });

module.exports = router;