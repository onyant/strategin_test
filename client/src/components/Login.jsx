import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuez la requête POST vers la route serveur pour la connexion
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // L'utilisateur est connecté avec succès
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Stockage local du token

        // Mettez à jour l'état pour indiquer que l'utilisateur est authentifié
        setLoggedIn(true);

        // Utilisez le hook de navigation pour rediriger l'utilisateur
        navigate('/users');
      } else {
        // Gérez les erreurs de connexion
        console.error('Erreur lors de la connexion de l\'utilisateur:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  // Redirigez l'utilisateur si connecté
  if (loggedIn) {
    return null; // You can render something else or leave it as null
  }

  return (
    <div className="flex-cont">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
