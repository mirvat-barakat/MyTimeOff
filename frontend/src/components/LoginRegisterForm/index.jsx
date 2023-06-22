import React, { useState } from 'react';
import TextInput from '../TextInput';
import Button from '../Button';
import './styles.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginRegisterForm = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    const data = JSON.stringify({
      "Email": loginEmail,
      "Password": loginPassword
     });
    const config = {
      method: "Post",
      data:data,
      url: 'http://localhost:5162/api/authentication/login',
      headers: {
        'content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    console.log(data);
    try {
      const res = await axios(config);
      if (res.data.status == "success") {
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("employee_id", res.data.employee.id);
         navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterSubmit = async(event) => {
    const data = JSON.stringify({
      "Name": registerName,
      "Email": registerEmail,
      "Password": registerPassword
     });

  const config = {
    method: "Post",
    data:data,
    url: 'http://localhost:5162/api/authentication/register',
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
    },
  };
  try {
    const res = await axios(config);
    if (res.data.status == "success") {
      localStorage.setItem('employee_id', JSON.stringify(res.data.employee._id));
         setIsLogin(true);
    }
  } catch (error) {
    return error.response;
  }
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