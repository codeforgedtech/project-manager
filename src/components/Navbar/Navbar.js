// src/components/Navbar/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Adjust the path to your AuthContext
import { signOut } from '../../services/authService'; // Adjust the path to your authService
import './Navbar.css'; // CSS file for styling

const Navbar = () => {
  const { user } = useContext(AuthContext); // Get the user from context
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogout = async () => {
    await signOut(); // Call the signOut function
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <nav className="navbar">
      <h1>Project Manager</h1>
      <ul>
        <li>
          <Link to="/">Panel</Link>
        </li>
        <li>
          <Link to="/projects">Projekt</Link>
        </li>
        <li>
          <Link to="/tasks">Uppgifter</Link>
        </li>
        <li>
          <Link to="/user-profile">Profil</Link>
        </li>
        {user && (
          <li>
            <button onClick={handleLogout}>Logga ut</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

