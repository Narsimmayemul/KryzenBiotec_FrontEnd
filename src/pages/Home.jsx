import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Our Product Store</h1>
        <p>Discover a wide range of products tailored to your needs.</p>
        <p>To see all the products you need to:</p>
        <div className="home-buttons">
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/signin')}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
