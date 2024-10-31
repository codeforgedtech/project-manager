// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import UserProfile from './pages/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';


import { AuthProvider, useAuth } from './context/AuthContext';
import ProjectList from './components/ProjectList/Projects';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
       
        <Routes>
        <Route path="/projects" element={<ProjectList />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;




