// src/components/ProjectModal.js
import React from 'react';
import Modal from 'react-modal'; // Importera react-modal
import { supabase } from '../supabaseClient';
import "./ProjectModal.css";
Modal.setAppElement('#root'); // Ställ in app-elementet för tillgänglighet

const ProjectModal = ({ isOpen, onRequestClose, projectId }) => {
  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    const fetchProjectDetails = async () => {
      if (projectId) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('project_id', projectId)
          .single();

        if (error) {
          console.error('Error fetching project details:', error);
        } else {
          setProject(data);
        }
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) return null; // Om projektet inte finns, returnera inget

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Project Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h1>{project.title}</h1>
      <p><strong>Beskrivning:</strong> {project.description}</p>
      <p><strong>Startdatum:</strong> {project.start_date}</p>
      <p><strong>Slutdatum:</strong> {project.end_date}</p>
      <button onClick={onRequestClose}>Stäng</button>
    </Modal>
  );
};

export default ProjectModal;
