const mongoose = require('mongoose');
const password = encodeURIComponent('87q7g#Ltq.UKtLz');

// Utilisez le mot de passe échappé dans l'URL de connexion
const uri= `mongodb+srv://TestStrategin:${password}@cluster0.eame3vs.mongodb.net/?retryWrites=true&w=majority`;
const connectToDatabase = async () => {
  try {
  
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connexion à la base de données établie.');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
};
module.exports = connectToDatabase;
