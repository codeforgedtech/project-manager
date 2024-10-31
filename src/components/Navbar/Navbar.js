// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Du kan lägga till en CSS-fil för att styla navigeringen

const Navbar = () => {
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
      </ul>
    </nav>
  );
};

export default Navbar;
