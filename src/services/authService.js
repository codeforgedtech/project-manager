import { supabase } from '../supabaseClient';

// Registrera användare
export const signUp = async (email, password, name) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (user) {
    // Lägg till användarinformation i Users-tabellen
    await supabase
      .from('Users')
      .insert([{ email, name, password, role: 'member' }]);
  }

  return { user, error };
};

// Logga in användare
export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  return { user, error };
};

// Logga ut användare
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};