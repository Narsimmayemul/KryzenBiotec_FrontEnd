import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance, { setAuthToken } from './axiosInstance';
import './css/Signin.css';


const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/signin', { username, password });
      const { token } = response.data;

      localStorage.setItem('token', token);
      setAuthToken(token);

      console.log(response.data);
      navigate('/products');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Sign In</h2>
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
          <Link to='/signup' className="signup-link">Don't have an account? Sign Up</Link>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
