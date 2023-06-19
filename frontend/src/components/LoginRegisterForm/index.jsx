import React, { useState } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import './styles.css';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit} className="form">
          <h2>Login</h2>
          <TextInput
            label="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <Button type="submit" label="Login" />
          <p>
            Don't have an account?{''}
            <a className='link' onClick={handleFormSwitch}>Register</a>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="form">
          <h2>Register</h2>
          <TextInput
            label="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <TextInput
            label="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <Button type="submit" label="Register" />
          <p>
            Already have an account?{''}
            <a className='link' onClick={handleFormSwitch}>Login</a>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginRegisterForm;