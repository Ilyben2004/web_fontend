import React, { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './signupForm.css';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission and page refresh

        // Payload with user inputs
        const payload = {
            name,
            email,
            password,
        };

        try {
            // Send a POST request to the registration endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/auth/register', payload);
            const data = response.data;

            if (data.status) {
                // Successful registration
                console.log('User created successfully:', data);
                // Save token to local storage
                localStorage.setItem('token', data.token);
                // Redirect to the home page
                window.location.href = '/dashboard';
            } else {
                // Handle API errors
                setError(data.message || 'An error occurred during registration.');
            }
        } catch (err) {
            // Error handling
            if (err.response) {
                setError(err.response.data.message || 'An error occurred during registration.');
            } else if (err.request) {
                setError('Server is not responding.');
            } else {
                setError(`An error occurred: ${err.message}`);
            }
        }
    };

    return (
        <Form className='theFormSignup' onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                <Form.Label column sm="2">Name</Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">Email</Form.Label>
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
                <Form.Label column sm="2">Password</Form.Label>
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

            {error && <div className="error">{error}</div>}

            <div className="button-container">
                <button id="submitBttn" type="submit">Submit</button>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </Form>
    );
}

export default SignupForm;
