import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        
        const data = await response.json();
        localStorage.setItem('authToken', data.token);      
        setLogged(true);
        navigate('/users');
      } else {

        const errorData = await response.json();
        setError(errorData.message);
        console.error("Erreur lors de la connexion de l'utilisateur:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

 
  if (logged) {
    return null; 
  }

  return (
    <div className="flex-cont">
      
      <form onSubmit={handleFormSubmit}>
      <h1>Login</h1>
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
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
     
    </div>
  );
};

export default LoginForm;
