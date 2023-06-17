import React from 'react';
import './styles.css';
import LoginRegisterForm from '../../components/LoginRegisterForm';

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className='welcome'>
      <div className="system-name-container">
        <h1 className="system-name">My Time Off</h1>
        <p className="welcome-message">Welcome to your vacation hub!</p>
        <p className="intro-message">Plan your well-deserved time off, keep track of your vacation days, and make the most out of your breaks. Our system simplifies the process, ensuring a seamless experience for managing your vacations. Get started today and embark on memorable adventures!</p>
      </div>
      <img src={"vacation.jpg"} alt="Vacation" className='img'/>
      </div>
      <div className="form-container">
        <LoginRegisterForm />
      </div>
    </div>
  );
};

export default LandingPage;