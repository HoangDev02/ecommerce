import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/API/apiRequest";
import { registerSuccess, registerFailed } from "../../redux/authSlice";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.register.currentUser);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }
    const newUser = {
      email: email,
      password: password,
      username: username,
    };
    registerUser(newUser, dispatch, navigate, registerSuccess, registerFailed);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <section className="register-container">
      <div className="register-title">Sign up</div>
      {errorMessage && <div className="register-error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister} className="register-form">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
          className="form-control"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="register-button">
          Create account
        </button>
      </form>
    </section>
  );
};

export default Register;
