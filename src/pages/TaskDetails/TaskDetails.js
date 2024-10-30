// src/pages/TaskDetails/TaskDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Task Details</h1>
      <p>Task ID: {id}</p>
      <p>This is where task-specific details will be displayed.</p>
    </div>
  );
};

export default TaskDetails;
