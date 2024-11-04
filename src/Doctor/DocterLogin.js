import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function DoctorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    const doctorLoginData = { email, password }; // Changed variable name for clarity

    try {
      const response = await fetch('http://localhost:9999/doctorlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorLoginData),
        credentials: 'include' // This allows the request to include cookies, if any
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const doctor = await response.json(); // Expecting a Doctor object
      if (doctor && doctor.email === email) { // Check if the returned doctor matches the email
        // Assuming you want to navigate after a successful login
        navigate('/success');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="custom-login-container">
      <h2>Doctor Login</h2>
      {errorMessage && <p className="custom-error-message">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="custom-input-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faUser} /> Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="custom-input-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="custom-login-button">Login</button>
      </form>
      <div className="custom-additional-links">
        {/* <Link className="nav-link" to="/patientRegistration">Register</Link> */}
      </div>
    </div>
  );
}

export default DoctorLoginPage;
