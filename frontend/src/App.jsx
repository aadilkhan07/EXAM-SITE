import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HeroPage from './components/HeroPage';
import Signin from './components/signin';
import Signup from './components/signup';

import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<HeroPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
