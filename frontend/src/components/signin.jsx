import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the correct import path

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Signin successful!');
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      alert('Signin failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container"> {/* Apply auth-container class */}
     <h2 className="auth-header">Signin</h2> {/* Apply auth-header class */}
    
      <form className="auth-form" onSubmit={handleSubmit}> {/* Apply auth-form class */}
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="auth-button">Sign In</button> {/* Apply auth-button class */}
      </form>
    </div>
  );
}

export default Signin;