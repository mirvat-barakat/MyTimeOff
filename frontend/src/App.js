import React  from 'react';
import LandingPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} /> 
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<HomePage />} /> 
              </Route>
            </Routes>
          </Router>
  );
};

export default App;
