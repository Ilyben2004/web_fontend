import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './LoginForm.css';
import {Link} from 'react-router-dom';

function LoginForm() {
  return (
    <Form className='theForm'>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col  sm="10">
          <Form.Control  placeholder="email@example.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row}  className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>
      <div class="button-container">
    <button id="logInBttn">Log in</button>
    <Link to="/signup">
    <button>Sign in</button>
    </Link>
    </div>
    </Form>
  );
}

export default LoginForm;