import { supabase } from '../supabaseClient';

// Hämta alla projekt
export const fetchProjects = async () => {
  const { data, error } = await supabase.from('Projects').select('*');
  return { data, error };
};

// Skapa nytt projekt
export const createProject = async (title, description, start_date, end_date) => {
  const { data, error } = await supabase
    .from('Projects')
    .insert([{ title, description, start_date, end_date }]);
  return { data, error };
};