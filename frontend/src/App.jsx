import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signin from './components/signin';
import Signup from './components/signup';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
