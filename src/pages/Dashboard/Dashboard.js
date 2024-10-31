import React from 'react';
import ProjectForm from '../../components/ProjectForm';
import ProjectList from '../ProjectList';
import './Dashboard.css'; // Glöm inte att importera CSS-filen

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="project-form">
        <ProjectForm />
      </div>
      <div className="project-list">
        <ProjectList />
      </div>
    </div>
  );
};

export default Dashboard;
