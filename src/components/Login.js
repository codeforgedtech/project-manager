import React, { useState, useContext } from 'react';
import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the Auth context
import "./Login.css";
const Login = () => {
    const { setUser } = useContext(AuthContext); // Use context to get the user setter
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const { user: loggedInUser, error: loginError } = await signIn(email, password);
        
        if (loginError) {
            setError('Inloggning misslyckades. Kontrollera dina uppgifter.');
        } else {
            // Store the user in context
            setUser(loggedInUser);
            console.log('User:', loggedInUser); // This should show the user object
            navigate('/'); // Redirect to the dashboard
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Logga in</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Lösenord" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Logga in</button>
        </form>
    );
};

export default Login;


