const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    // Répondez avec la liste des utilisateurs
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des utilisateurs" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }

   
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      
      const token = jwt.sign({ userId: user._id }, "votre_secret_key_secrete", { expiresIn: "1h" });

      
      res.json({ success: true, message: "Connexion réussie", token });
    } else {
      
      res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur:", error);
    res.status(500).json({ success: false, error: "Erreur serveur lors de la connexion" });
  }
});
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const newUser = new User({ email, password });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error("Erreur lors de l'insertion de l'utilisateur:", error);
      res.status(500).json({ error: "Erreur serveur lors de l'insertion de l'utilisateur" });
    }
  });

module.exports = router;