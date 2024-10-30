// src/pages/ProjectDetails/ProjectDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project ID: {id}</p>
      <p>This is where project-specific details will be displayed.</p>
    </div>
  );
};

export default ProjectDetails;
