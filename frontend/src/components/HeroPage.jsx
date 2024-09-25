// src/components/HeroPage.jsx
import React from 'react';
import '../index.css'; // Import the CSS file for styling

  const handleGetStarted = () => {
    history.push('/.backend/signup'); // Navigate to the signup route
  };
const HeroPage = () => {
  return (
    <div className="hero">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#" className="logo">ExamEdge</a>
          {/* <ul className="nav-links">
            <li><a href="#smart-contracts">Smart Contracts</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#solutions">Solutions</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="#whitepaper">Whitepaper</a></li>
          </ul> */}
        </div>
        <div className="navbar-right">
          <button className="icon-btn"><i className="fas fa-search"></i></button>
          <button className="icon-btn"><i className="fas fa-user"></i></button>
          <button className="icon-btn"><i className="fas fa-bars"></i></button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>
          <span className="gradient-text">Ace your exams with ExamEdge.</span> <br />
        
        </h1>
        <p className='text-4xl font-bold'>
        Get ahead in your exams with ExamEdge's comprehensive, easy-to-use resources.
        </p>
        {/* Wrap the button with Link */}
            <button className="btn-primary" onClick={handleGetStarted}>Get started</button>
         
      </div>
    </div>  
  );
};

export default HeroPage;
