import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './TaskForm.css';

const TaskForm = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the Users table
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('user_id, name');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Assigned User ID:", assignedUserId); // Debug log
    console.log("Parsed Assigned User ID:", parseInt(assignedUserId)); // Check if it converts properly

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          project_id: projectId,
          assigned_user_id: parseInt(assignedUserId), // Convert to integer
        },
      ]);

    if (error) {
      console.error('Error creating task:', error);
    } else {
      console.log('Task created successfully:', data);
    }

    // Reset the form
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setPriority(1);
    setDueDate('');
    setAssignedUserId('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Skapa ny uppgift</h2>
      
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
        Prioritet:
        <input
          type="number"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </label>

      <label>
        Förfallodatum:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <label>
  Tilldelad användare:
  <select
    value={assignedUserId}
    onChange={(e) => setAssignedUserId(e.target.value)}
    required
  >
    <option value="">Välj en användare</option>
    {users.map((user) => (
      <option key={user.id} value={user.id}>  {/* Use user.id here */}
        {user.name}
      </option>
    ))}
  </select>
</label>

      <button type="submit">Skapa uppgift</button>
    </form>
  );
};

export default TaskForm;






