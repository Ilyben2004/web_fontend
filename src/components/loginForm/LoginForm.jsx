import React, { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm({
  apiEndpoint = 'http://127.0.0.1:8000/api/auth/login', // Default login endpoint
  onLoginSuccess, // Callback for successful login
  onLoginFailure, // Callback for login failure
  redirectUrl = '/map', // Default URL to redirect on successful login
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Use navigate from react-router-dom for redirection

  // Event handler for the login button click
  const handleLoginClick = async (event) => {
    event.preventDefault(); // Prevent form submission and page refresh
  
    // Define the payload with email and password
    const loginPayload = {
      email,
      password,
    };
  
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(apiEndpoint, loginPayload);
      const data = response.data;
  
      if (data.status) {

       console.log(data);
        localStorage.setItem('token', data.token);
        // Notify success via the onLoginSuccess callback if provided
        if (onLoginSuccess) onLoginSuccess(data);
        // Redirect to the specified URL
      
        navigate(redirectUrl);
      } else {
        // If login was not successful, update the error state with the message
        setError(data.message);
        // Notify failure via the onLoginFailure callback if provided
        if (onLoginFailure) onLoginFailure(data.message);
      }
    } catch (err) {
      // Handle request errors
      if (err.response) {
        // Server responded with a status code other than 2xx
        setError(err.response.data.message);
      } else if (err.request) {
        // Request was made but no response was received
        setError('Server is not responding.');
      } else {
        // Other errors
        setError('An error occurred: ' + err.message);
      }
    }
  };

  return (
    <Form className="theForm">
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control 
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Col>
      </Form.Group>

      {/* Display error message if any */}
      {error && <div className="error">{error}</div>}

      <div className="button-container">
        <button id="logInBttn" onClick={handleLoginClick}>Log in</button>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
