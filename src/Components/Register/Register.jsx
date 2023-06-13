import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { useDispatch,useSelector } from "react-redux";

import { registerUser } from "../../redux/API/apiRequest";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
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
    registerUser(newUser, dispatch, navigate);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>USERNAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
