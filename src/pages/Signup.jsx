import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import './css/Signup.css'; // Import your CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kyzen-backend-1.onrender.com/api/signup', { username, email, password });
      const token = response.data.token;

      localStorage.setItem('token', token);
      const axiosInstance = axios.create({
        baseURL: 'https://kyzen-backend-1.onrender.com/api',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      navigate('/signin');
    } catch (error) {
      console.log('Error from signUp function:', error);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-form">
        <h2>Sign Up</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to="/signin" className="signin-link">Already have an account? Sign In</Link>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
