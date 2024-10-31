// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import TaskList from '../components/TaskList/TaskList';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2 className="project-list-title">Projektlista</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id} className="project-item">
            <h3 className="project-title">
              <FaClipboardList className="icon" /> {project.title}
            </h3>
            <p className="project-description">{project.description}</p>
            <p className="project-date">
              <FaCalendarAlt className="icon" /> Startdatum: {project.start_date}
            </p>
            <p className="project-date">
              <FaCalendarAlt className="icon" /> Slutdatum: {project.end_date}
            </p>
            <TaskList projectId={project.project_id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;



