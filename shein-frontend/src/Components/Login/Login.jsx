import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    };
    loginUser(newUser, dispatch, navigate);
  }

  return (
    <Container className="login-container">
      <h2 className="login-title">Log in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter your username" onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <button className="login-button" type="submit">Continue</button>
      </Form>
      <div className="login-register">Don't have an account yet?</div>
      <Link className="login-register-link" to="/register">Register one for free</Link>
    </Container>
  );
}

export default Login;
