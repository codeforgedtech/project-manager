// TaskFormModal.js
import React from 'react';
import TaskForm from '../../components/TaskList/TaskForm'; // Import TaskForm
import './TaskFormModal.css'; // Add your CSS styles for the modal

const TaskFormModal = ({ isOpen, onClose, projectId, onTaskCreated , task}) => {
    if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>{task ? "Ändra uppgift" : "Lägg till uppgift"}</h2> 
        <TaskForm projectId={projectId} onTaskCreated={onTaskCreated} task={task}/>
        <button className="close-button" onClick={onClose}>Stäng</button>
      </div>
    </div>
  );
};

export default TaskFormModal;


