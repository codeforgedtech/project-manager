import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import './Project.css';
import ProjectModal from '../../pages/ProjectModal';
import ProjectFormModal from './ProjectFormModal';
import TaskFormModal from './TaskFormModal'; // Import the TaskFormModal component
import { FaEdit, FaTrash, FaInfoCircle, FaPlus, FaClipboardCheck } from 'react-icons/fa';
import EditTaskForm from '../TaskList/EditTaskForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState({}); // State to hold tasks associated with projects
  const [users, setUsers] = useState({}); // State to hold users for mapping
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false); // State for task form modal

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State to hold selected task ID for editing
  const [visibleTasks, setVisibleTasks] = useState({}); // State to manage visibility of tasks
  const [selectedTask, setSelectedTask] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) console.error('Error fetching projects:', error);
      else setProjects(data);
    };

    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*'); // Fetch all tasks
      if (error) console.error('Error fetching tasks:', error);
      else {
        // Organize tasks by project ID
        const tasksByProjectId = data.reduce((acc, task) => {
          if (!acc[task.project_id]) acc[task.project_id] = [];
          acc[task.project_id].push(task);
          return acc;
        }, {});
        setTasks(tasksByProjectId);
      }
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*'); // Fetch all users
      if (error) console.error('Error fetching users:', error);
      else {
        // Create a mapping of user ID to user name
        const userMapping = {};
        data.forEach(user => {
          userMapping[user.user_id] = user.name; // Assuming user object has user_id and name
        });
        setUsers(userMapping);
      }
    };

    fetchProjects();
    fetchTasks(); // Call the fetch tasks function
    fetchUsers(); // Fetch users to map user IDs to names
  }, []);

  const handleAddProject = () => {
    setIsFormModalOpen(true);
  };

  const handleEdit = (projectId) => {
    console.log(`Redigera projekt med ID: ${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm("Är du säker på att du vill ta bort detta projekt?");
    if (confirmDelete) {
      const { error } = await supabase.from('projects').delete().eq('project_id', projectId);
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        setProjects(projects.filter((project) => project.project_id !== projectId));
        // Remove any visible tasks when the project is deleted
        setVisibleTasks((prev) => {
          const newTasks = { ...prev };
          delete newTasks[projectId];
          return newTasks;
        });
      }
    }
  };

  const handleAssignTask = (projectId) => {
    // Toggle the visibility of tasks for the selected project
    setVisibleTasks((prev) => ({
      ...prev,
      [projectId]: !prev[projectId], // Toggle the state (true/false)
    }));
  };

  const handleDeleteTask = async (taskId, projectId) => {
    const confirmDelete = window.confirm("Är du säker på att du vill ta bort denna uppgift?");
    if (confirmDelete) {
      const { error } = await supabase.from('tasks').delete().eq('task_id', taskId);
      if (error) {
        console.error('Error deleting task:', error);
      } else {
        // Remove the task from state
        setTasks((prevTasks) => {
          const updatedTasks = { ...prevTasks };
          updatedTasks[projectId] = updatedTasks[projectId].filter(task => task.task_id !== taskId);
          return updatedTasks;
        });
      }
    }
  };

  const openTaskFormModal = (projectId, task = null) => {
    setSelectedProjectId(projectId);
    setSelectedTask(task); // Set the selected task for editing, or null for a new task
    setIsTaskFormModalOpen(true);
  };

  const closeTaskFormModal = () => {
    setIsTaskFormModalOpen(false);
    setSelectedProjectId(null);
    setSelectedTask(null);
  };
  
  const saveTask = async (taskData) => {
    if (selectedTask) {
      // Update task if editing
      const { error } = await supabase.from('tasks').update(taskData).eq('task_id', selectedTask.task_id);
      if (error) console.error('Error updating task:', error);
      else {
        setTasks(prevTasks => {
          const updatedTasks = { ...prevTasks };
          const taskIndex = updatedTasks[selectedProjectId].findIndex(task => task.task_id === selectedTask.task_id);
          updatedTasks[selectedProjectId][taskIndex] = { ...updatedTasks[selectedProjectId][taskIndex], ...taskData };
          return updatedTasks;
        });
      }
    } else {
      // Insert new task if adding
      const { data, error } = await supabase.from('tasks').insert([{ ...taskData, project_id: selectedProjectId }]);
      if (error) console.error('Error adding task:', error);
      else {
        setTasks(prevTasks => ({
          ...prevTasks,
          [selectedProjectId]: [...(prevTasks[selectedProjectId] || []), data[0]]
        }));
      }
    }
    closeTaskFormModal();
  };

  const openProjectModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedProjectId(null);
  };
 
  return (
    <div className="project-list">
      <h2>Alla Projekt</h2>
      
      <button onClick={handleAddProject} className="add-project-button">
        <FaPlus style={{ marginRight: '5px' }} /> Lägg till projekt
      </button>

      <ul>
        {projects.map((project) => (
          <li key={project.project_id} className="project-item">
            <h3>{project.title}</h3>
            <div className="date-container">
              <p>Start: {project.start_date}</p>
              <p>Slut: {project.end_date}</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleEdit(project.project_id)} title="Redigera" className="edit-button">
                <FaEdit /> Redigera
              </button>
              <button onClick={() => handleDelete(project.project_id)} title="Ta bort" className="delete-button">
                <FaTrash /> Ta bort
              </button>
              <button onClick={() => openProjectModal(project.project_id)} title="Detaljer" className="details-button">
                <FaInfoCircle /> Detaljer
              </button>
              <button onClick={() => openTaskFormModal(project.project_id)} title="Lägg till uppgift" className="assign-task-button">
                <FaPlus /> Uppgift
              </button>
              <button onClick={() => handleAssignTask(project.project_id)} title="Visa/dölj uppgifter" className="assign-task-button">
                <FaClipboardCheck /> Uppgift
              </button>
            </div>

            {/* Render task list directly under the project item */}
            {visibleTasks[project.project_id] && ( // Only show tasks if visible
              <div className="task-list-container">
                <h4>Uppgifter för {project.title}:</h4>
                {tasks[project.project_id] && tasks[project.project_id].length > 0 ? (
                  <ul className="task-list">
                    {tasks[project.project_id].map(task => (
                       <li key={task.task_id}>
                        <p><strong>{task.title}:</strong> {task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Prioritering: <span className={`priority priority-${task.priority}`}>
                {task.priority}
              </span></p>
                        <p>Tilldelad: {users[task.assigned_user_id] || 'Okänd'}</p>
                        <div className="action-buttons">
                         <button onClick={() => openTaskFormModal(project.project_id, task)} title="Redigera uppgift" className="edit-button">
                            <FaEdit /> Redigera
                          </button>
                          <button onClick={() => handleDeleteTask(task.task_id, project.project_id)} title="Ta bort uppgift" className="delete-button">
                            <FaTrash /> Ta bort
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Inga uppgifter tilldelade.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Modals */}
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onRequestClose={closeProjectModal} 
        projectId={selectedProjectId} 
      />

      <ProjectFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)} 
      />

<TaskFormModal
        isOpen={isTaskFormModalOpen}
        onClose={closeTaskFormModal}
        projectId={selectedProjectId}
        onTaskCreated={saveTask}
        task={selectedTask} // Pass the selected task for editing, or null for a new task
      />

    </div>
   
  );
};

export default ProjectList;














