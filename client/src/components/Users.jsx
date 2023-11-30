import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './users.css';
const Users = () => {
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    } else {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users');
          if (response.ok) {
            const userData = await response.json();
            setUsers(userData);
          } else {
            console.error('Erreur lors de la récupération des utilisateurs:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
        }
      };

     
      fetchUsers();
    }
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (

    <div className="flex-cont-users">
      <h1>Liste des utilisateurs :</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
      <button onClick={handleLogout}>Déconnexion</button>
      </div>
   
  );
};

export default Users;
