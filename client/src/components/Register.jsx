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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Utilisateur ajouté avec succès:', user);
        navigate('/login')
      } else {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div className="flex-cont">
     
      <form onSubmit={handleFormSubmit}>
      <h1>Register</h1>
        <p><input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></p>
        <p>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></p>
        <button type="submit">Ajouter un utilisateur</button>
      </form>
    </div>
  );
};

export default UserForm;