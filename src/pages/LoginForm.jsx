import "../css/Login.css";
import { mainScheme } from "../colors/schemes";

import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../validators/validations";
import { loginUser } from "../api/user-api";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({});
    setSuccessMessage('');
    
    const newErrors = {};
    
    if (!emailOrUsername) {
      newErrors.email = 'Email or username is required';
    } else if (!(validateUsername(emailOrUsername) || validateEmail(emailOrUsername))) {
        newErrors.email = "Please enter a valid email or username from 6 to 30 characters using only letters, digits and underscores.";
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const err = await loginUser(emailOrUsername, password);
    if (err) setErrors({general: err});
    setSuccessMessage('Login successful!');
  };

  return (
    <div className="login-form-container">
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
      
        <div className="auth-text-field">
          <TextField id="outlined-basic1" fullWidth
          error={errors.email}
          type='text' label="Email or Username" variant="outlined"
          value={emailOrUsername} onChange={e=>setEmailOrUsername(e.target.value)}
          helperText={errors.email}/>
        </div>
        <div className="auth-text-field">
          <TextField id="outlined-basic2" fullWidth
          error={errors.password}
          type="password" label="Password" variant="outlined"
          value={password} onChange={e=>setPassword(e.target.value)}
          helperText={errors.password}/>
        </div>
      
        {errors.general && <div className="error-message">{errors.general}</div>}
      
        <Button fullWidth variant="contained"
          sx={{backgroundColor: mainScheme.blue, color: mainScheme.white}}
          onClick={handleSubmit}
        >
            Login
        </Button>
      
        {successMessage && <div className="success-message">{successMessage}</div>}
      
        <div className="switch-form">
          <p>Don't have an account? <Link className="signup-link" to="/signup">Sign Up!</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;