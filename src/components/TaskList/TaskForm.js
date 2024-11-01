import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './TaskForm.css';

const TaskForm = ({ projectId, onTaskCreated, task }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : '');
  const [priority, setPriority] = useState(task ? task.priority : 1);
  const [dueDate, setDueDate] = useState(task ? task.due_date : '');
  const [assignedUserId, setAssignedUserId] = useState(task ? task.assigned_user_id : '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('user_id, name');
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

    const taskData = {
      title,
      description,
      status,
      priority,
      due_date: dueDate,
      project_id: projectId,
      assigned_user_id: parseInt(assignedUserId),
    };

    if (task) {
      // Editing existing task
      const { error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('task_id', task.task_id);
      if (error) {
        console.error('Error updating task:', error);
      } else {
        console.log('Task updated successfully');
        onTaskCreated(taskData); // Callback to refresh the task list
      }
    } else {
      // Creating a new task
      const { error } = await supabase.from('tasks').insert([taskData]);
      if (error) {
        console.error('Error creating task:', error);
      } else {
        console.log('Task created successfully');
        onTaskCreated(taskData); // Callback to refresh the task list
      }
    }

    // Reset form fields if in create mode
    if (!task) {
      setTitle('');
      setDescription('');
      setStatus('');
      setPriority(1);
      setDueDate('');
      setAssignedUserId('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task ? 'Ändra uppgift' : 'Skapa ny uppgift'}</h2>
      
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
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">Välj status</option>
          <option value="In Progress">Pågående</option>
          <option value="Completed">Klar</option>
        </select>
      </label>

      <label>
        Prioritet:
        <input
          type="number"
          value={priority}
          min="1"
          max="5"
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
            <option key={user.user_id} value={user.user_id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">{task ? 'Uppdatera uppgift' : 'Skapa uppgift'}</button>
    </form>
  );
};

export default TaskForm;








