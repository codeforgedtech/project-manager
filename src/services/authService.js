import { supabase } from '../supabaseClient';

// Registrera användare
export const signUp = async (email, password, name) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (user) {
    // Lägg till användarinformation i Users-tabellen
    const { error: insertError } = await supabase
      .from('Users')
      .insert([{ email, name, password, role: 'member' }]);

    if (insertError) {
      console.error('Error inserting user data:', insertError);
    }
  }

  return { user, error };
};
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
// Logga in användare
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  // Check for errors
  if (error) {
    console.error('Login error:', error);
    return { user: null, error }; // Return null user in case of error
  }
  
  return { user: data.user, error: null }; // Return user if successful
};