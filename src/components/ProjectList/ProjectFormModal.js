// ProjectFormModal.js
import React from 'react';
import ProjectForm from '../../components/ProjectForm'; // Import ProjectForm
import './ProjectFormModal.css';

const ProjectFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      
        <h2>Nytt Projekt</h2>
        <ProjectForm />
        <button className="close-button" onClick={onClose}>Stäng</button>
      </div>
    </div>
  );
};

export default ProjectFormModal;
