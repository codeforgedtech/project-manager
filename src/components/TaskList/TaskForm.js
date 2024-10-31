import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const TaskForm = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending'); // Standardstatus
  const [priority, setPriority] = useState(1); // Exempel på prioritet
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          project_id: projectId, // Se till att projectId är korrekt
        },
      ]);

    if (error) {
      console.error('Error creating task:', error);
    } else {
      console.log('Task created successfully:', data);
    }

    // Återställ formuläret
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setPriority(1);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Priority:
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </label>
      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;


