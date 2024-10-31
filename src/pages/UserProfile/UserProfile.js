import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {error && <p>Error: {error}</p>}
      {user ? (
        <div>
          <p>Name: {user.user_metadata.full_name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default UserProfile;