// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails/ProjectDetails'));
const TaskDetails = lazy(() => import('./pages/TaskDetails/TaskDetails'));
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProtectedRoute element={<ProjectDetails />} />} />
            <Route path="/task/:id" element={<ProtectedRoute element={<TaskDetails />} />} />
            <Route path="/user-profile" element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;



