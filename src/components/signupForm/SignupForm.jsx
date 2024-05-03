import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './signupForm.css';
import {Link} from 'react-router-dom';


function SignupForm() {
  return (
    <Form className='theFormSignup'>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextFirstName">
        <Form.Label column sm="2">
          First Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="First Name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextLastName">
        <Form.Label column sm="2">
          Last Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Last Name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label className='label' column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type="email" placeholder="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label className='label' column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
    
      
      <div className="button-container">

        <button id="logInBttn">Submit</button>
        <Link  to="/login">
        <button>Login</button>
        </Link>
      </div>
    </Form>
  );
}

export default SignupForm;
