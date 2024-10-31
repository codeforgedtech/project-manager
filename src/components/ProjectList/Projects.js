import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

import '../../pages/ProjectList.css';
import ProjectModal from '../../pages/ProjectModal'; // Importera modal

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Håller koll på vilket projekt som är valt

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) console.error('Error fetching projects:', error);
      else setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    // Hantera redigeringslogik här
    console.log(`Redigera projekt med ID: ${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const { error } = await supabase.from('projects').delete().eq('project_id', projectId);
    if (error) {
      console.error('Error deleting project:', error);
    } else {
      setProjects(projects.filter(project => project.project_id !== projectId));
    }
  };

  const openModal = (projectId) => {
    setSelectedProjectId(projectId); // Sätt det valda projekt-ID
    setIsModalOpen(true); // Öppna modalen
  };

  const closeModal = () => {
    setIsModalOpen(false); // Stäng modalen
    setSelectedProjectId(null); // Återställ valt projekt-ID
  };

  return (
    <div className="project-list">
      <h2>Alla Projekt</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <h3>{project.title}</h3>
            <div className="date-container">
              <p>Start Date: {project.start_date}</p>
              <p>End Date: {project.end_date}</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleEdit(project.project_id)}>Redigera</button>
              <button onClick={() => handleDelete(project.project_id)}>Ta bort</button>
              <button onClick={() => openModal(project.project_id)}>Detaljer</button>
            </div>
          </li>
        ))}
      </ul>
      <ProjectModal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        projectId={selectedProjectId} 
      />
    </div>
  );
};

export default ProjectList;