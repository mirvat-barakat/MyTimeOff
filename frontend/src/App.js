import React, { useState } from 'react';
import LandingPage from './pages/LoginPage';

const App = () => {
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
      <LandingPage/>
  );
};

export default App;
