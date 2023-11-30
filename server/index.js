const express = require('express');
const app = express();
const path = require('path');
const connectToDatabase = require('./bd');
const User = require('./models/user');
const apiRoutes = require('./routes/apiRoutes');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use('/api', apiRoutes);
const startServer = async () => {
  try {
    
    await connectToDatabase();
  
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    const port = 5000;
   
    app.listen(port, () => {
      console.log('Serveur express démarré port:', port);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage port:', error);
  }
};

startServer();
