import "../css/SignUp.css";
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

const SignupForm = ({ onFormSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({});
    setSuccessMessage('');
    
    const newErrors = {};
    
    if (!username) {
      newErrors.username = 'Username is required';
    } else if(username.length < 6 || username.length > 30){
      newErrors.username = 'Username must have from 6 to 30 characters';
    } else if(!validateUsername(username)){
      newErrors.username = 'Username must contain only letters, digits and underscores';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
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
    
    try {
      const API_URL = `${import.meta.env.VITE_MUSIC_API_URL}/music-api/users`;

      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSuccessMessage('Account created successfully!');
      } else {
        setErrors({ email: 'Email already in use or registration failed' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>
      
        <div className="auth-text-field">
          <TextField className="text-field" id="outlined-basic1" fullWidth
            error={errors.username}
            type='text' label="Username" variant="outlined"
            value={username} onChange={e=>setUsername(e.target.value)}
            helperText={errors.username}/>
        </div>
        <div className="auth-text-field">
          <TextField className="text-field" id="outlined-basic2" fullWidth
            error={errors.email}
            type='text' label="Email" variant="outlined"
            value={email} onChange={e=>setEmail(e.target.value)}
            helperText={errors.email}/>
        </div>
        <div className="auth-text-field">
          <TextField className="text-field" id="outlined-basic3" fullWidth
            error={errors.password}
            type='password' label="Password" variant="outlined"
            value={password} onChange={e=>setPassword(e.target.value)}
            helperText={errors.password}/>
        </div>
      
        {errors.general && <div className="error-message">{errors.general}</div>}

        <Button fullWidth variant="contained" sx={{backgroundColor: mainScheme.blue, color: mainScheme.white}}
         onClick={handleSubmit}>Sign Up</Button>
      
        {successMessage && <div className="success-message">{successMessage}</div>}
      
        <div className="switch-form">
          <p>Already have an account? <Link className="login-link" to="/login">Login!</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;