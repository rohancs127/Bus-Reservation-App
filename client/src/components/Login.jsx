import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';


const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);

      setIsLoggedIn(true);
      setErrorMessage(''); 
      navigate('/bookings');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='login-page-div'>
      <h2 className='heading'>User login</h2>
      <form onSubmit={handleLogin} className='login-block'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <div className='new-register'>
        <p>New user? <strong><Link to="/register">Register</Link></strong></p>
      </div>
    </div>
  );
};

export default Login;
