import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './EditTaskForm.css'; // Import the CSS file

const EditTaskForm = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.due_date);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setDueDate(task.due_date);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the values before submitting
    console.log("Submitting task with:", { title, description, status, priority, dueDate });

    const { error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        status, // Ensure this is a valid status value
        priority,
        due_date: dueDate,
      })
      .eq('task_id', task.task_id);

    if (error) {
      console.error('Error updating task:', error);
    } else {
      onUpdate(); // Callback to refresh task list
      onClose(); // Close modal
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFD700'; // Guld
      case 'In Progress':
        return '#1E90FF'; // Blå
      case 'Completed':
        return '#32CD32'; // Grön
      default:
        return '#FFFFFF'; // Standard (vit)
    }
  };
  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <h2>Redigera Uppgift</h2>
      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Beskrivning:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
      Status:
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        style={{ backgroundColor: getStatusColor(status) }}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </label>
   
      <label>
        Prioritet:
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        />
      </label>
      <label>
        Förfallodatum:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Uppdatera</button>
      <button type="button" onClick={onClose}>Avbryt</button>
    </form>
  );
};

export default EditTaskForm;




