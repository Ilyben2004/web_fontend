import React, { useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';



function AddPhoneForm({ AddPhone }) {
   
    // State variables
    const [ownerName, setOwnerName] = useState('');
    const [libelle, setLibelle] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Event handler for form submission
    const handleAddPhone = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Create a payload for the request
        const phoneData = {
            ownerName,
            libelle,
            type,
            city,
            phoneNumber,
            email,
        };

        try {
            // Send a POST request to your API endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/phones', phoneData);
            // If the response is successful, display a success message
            console.log("xxxxxxxxxxxxx")

            if (response.status === 201) {
           
             

                // Clear form fields
                setOwnerName('');
                setLibelle('');
                setType('');
                setCity('');
                setPhoneNumber('');
                setEmail('');
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                AddPhone(response.data.data);
                           

            }
        } catch (error) {
            // Handle errors
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <Form className='theFormSignup' onSubmit={handleAddPhone}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextOwner">
                <Form.Label column sm="2">
                    Owner Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="Please enter the owner's name"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                <Form.Label column sm="2">
                    Phone Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="Phone Name"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextType">
                <Form.Label column sm="2">
                    Type
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextCity">
                <Form.Label column sm="2">
                    City
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
                <Form.Label column sm="2">
                    Phone Number
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                    Email
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Col>
            </Form.Group>

            {/* Display success and error messages */}
            {success &&     <Alert id="alertsuccess" key='primary'  variant='success'>
                    <center> Phone Added</center>
         
        </Alert>}
            {error && <div className="error">{error}</div>}
        
            <div className="button-container">
                <button id="addPhoneButton" type="submit">Add Phone</button>
            </div>
        </Form>
    );
}

export default AddPhoneForm;
