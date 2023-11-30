import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

localStorage.removeItem('authToken');
const Users = () => {
  
const navigate = useNavigate();
  // Vérifiez si l'utilisateur est authentifié au chargement du composant
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
      navigate('/login');
    }
  }, [navigate]); // Le tableau [navigate] garantit que cet effet se déclenche lorsque navigate change

  const handleLogout = () => {
   
    localStorage.removeItem('authToken');
    navigate('/login')
   
  };

  return (
    <>
      <p>Les utilisateurs</p>
      {/* Bouton de déconnexion */}
      <button onClick={handleLogout}>Déconnexion</button>
    </>
  );

};

export default Users;
