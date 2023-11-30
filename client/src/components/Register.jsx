import './register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Effectuez la requête POST vers la route serveur
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // L'utilisateur a été ajouté avec succès
        const user = await response.json();
        console.log('Utilisateur ajouté avec succès:', user);
        navigate('/login')
      } else {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div className="flex-cont">
      <h1>Register</h1>
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
        <button type="submit">Ajouter utilisateur</button>
      </form>
    </div>
  );
};

export default UserForm;