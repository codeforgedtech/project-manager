// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/user-profile">User Profile</Link>
        </li>
      </ul>

      <h3>Quick Actions</h3>
      <ul>
        <li>
          <Link to="/projects/new">Create New Project</Link>
        </li>
        <li>
          <Link to="/tasks/new">Create New Task</Link>
        </li>
      </ul>

      <h3>User Info</h3>
      <p>User: John Doe</p>
      <Link to="/settings">Settings</Link>

      <button onClick={() => { /* logga ut logik */ }}>Log Out</button>
    </div>
  );
};

export default Sidebar;

