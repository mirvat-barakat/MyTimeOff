import React  from 'react';
import LandingPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} /> 
              <Route path="/home" element={<HomePage />} /> 
            </Routes>
          </Router>
  );
};

export default App;
