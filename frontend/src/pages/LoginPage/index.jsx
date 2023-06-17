import React from 'react';
import './styles.css';
import LoginRegisterForm from '../../components/LoginRegisterForm';

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="system-name-container">
        <h1>System Name</h1>
      </div>
      <div className="form-container">
        <LoginRegisterForm />
      </div>
    </div>
  );
};

export default LandingPage;