import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import Modal from './Modal';
import { FaEdit, FaTrash, FaClock, FaCheckCircle, FaCog, FaFlag, FaPlus } from 'react-icons/fa'; // Importera ikoner
import './TaskList.css';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);

      if (error) {
        console.error('Error fetching tasks:', error);
        setError('Kunde inte hämta uppgifter.');
      } else {
        setTasks(data);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [projectId]);

  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('task_id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      setTasks(tasks.filter(task => task.task_id !== taskId));
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsEditModalOpen(true);
  };

  const refreshTasks = () => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId);

      if (data) {
        setTasks(data);
      }
    };
    fetchTasks();
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <FaClock 
            title="Pending" 
            className="status-icon" 
            style={{ color: '#FFD700' }} // Guld färg
          />
        );
      case 'In Progress':
        return (
          <FaCog 
            title="I process" 
            className="status-icon" 
            style={{ color: '#1E90FF' }} // Blå färg
          />
        );
      case 'Completed':
        return (
          <FaCheckCircle 
            title="Fullföljd" 
            className="status-icon" 
            style={{ color: '#32CD32' }} // Grön färg
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="task-list">
      <h2>Uppgifter</h2>
      <button onClick={() => setIsModalOpen(true)} className="add-task-button">
  <FaPlus style={{ marginRight: '5px' }} /> {/* Add the icon */}
  Lägg till uppgift
</button>
      
      {loading && <p>Laddar uppgifter...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="task-container">
        {tasks.map((task) => (
          <li key={task.task_id} className="task-item">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-actions">
                <button onClick={() => handleEditTask(task)} title="Redigera">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteTask(task.task_id)} title="Ta bort">
                  <FaTrash />
                </button>
              </div>
            </div>
            <p>{task.description}</p>
            <div className="task-details">
            <FaFlag className="priority-icon" />
              <span>
               {task.priority}
              </span>
              <FaClock className="clock-icon"/>
              <span>
               {task.due_date}
              </span>
              {renderStatusIcon(task.status)}
              <span>
                 {task.status}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm projectId={projectId} />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {currentTask && <EditTaskForm task={currentTask} onClose={() => setIsEditModalOpen(false)} onUpdate={refreshTasks} />}
      </Modal>
    </div>
  );
};

export default TaskList;



           






