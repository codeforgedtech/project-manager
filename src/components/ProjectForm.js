import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import "./ProjectForm.css"
const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('projects')  // Kontrollera att detta matchar ditt tabellnamn exakt
      .insert([
        { title, description, start_date: startDate, end_date: endDate },
      ]);

    if (error) {
      console.error('Error creating project:', error);  // Lägg till detaljer om error-objektet
    } else {
      console.log('Project created successfully:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Beskrivning
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Startdatum:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        Slutdatum
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <button type="submit">Lägg till projekt</button>
    </form>
  );
};

export default ProjectForm;

