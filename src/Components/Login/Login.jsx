import { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/API/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { loginFailed, loginSuccess } from "../../redux/authSlice";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: username,
      password: password,
    };

    try {
      setError(""); // Xóa thông báo lỗi trước đó (nếu có)
      const res = await loginUser(newUser, dispatch, navigate);
      
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError("Wrong username or password"); // Đặt thông báo lỗi
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);
  return (
    <Container className="login-container">
      <h2 className="login-title">Log in</h2>
      {error && <div className="error-message">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
            className="form-control-login"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control-login"
          />
        </Form.Group>
        <button className="login-button" type="submit">
          Continue
        </button>
      </Form>
      <div className="login-register">Don't have an account yet?</div>
      <Link className="login-register-link" to="/register">
        Register one for free
      </Link>
    </Container>
  );
};

export default Login;
