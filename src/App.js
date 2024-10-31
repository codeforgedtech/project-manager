// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import TaskDetails from './pages/TaskDetails/TaskDetails';
import UserProfile from './pages/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ProjectList from './components/ProjectList/Projects';

const App = () => {
  const [user, setUser] = useState(null); // State to track the user

  const handleLogin = () => {
    // Function to be called on successful login
    setUser(true); // Set user to true or any user info you want to store
  };
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar /> {/* Navbar visas endast när användaren är inloggad */}
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Navbar />
                <ProjectList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <TaskDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;





