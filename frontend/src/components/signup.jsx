import axios from 'axios';
import React, { useState } from 'react';
import '../index.css'; // Corrected import path

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/signup', { email, password });
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed: ' + error.response.data.message);
    }
  };

  return (
    <div className="auth-container"> {/* Apply auth-container class */}
      <h2 className="auth-header">Signup</h2> {/* Apply auth-header class */}
      <form className="auth-form" onSubmit={handleSubmit}> {/* Apply auth-form class */}
        <label>
          Email:    
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="auth-button">Sign Up</button> {/* Apply auth-button class */}
      </form>
    </div>
  );
}

export default Signup;
