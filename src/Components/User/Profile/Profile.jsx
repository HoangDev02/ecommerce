import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../redux/createInstance";
import { changepassword } from "../../../redux/API/apiProfile";

function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  useEffect(() => {
    if(user === null){
      window.location.href = '/login'
    }
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "oldPassword") setOldPassword(value);
    if (name === "newPassword") setNewPassword(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: user.username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/changepassword`,
        data
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Mật khẩu cũ không đúng!");
    }
  };
  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="avatart-profile pt-5">
            <img
              src={user?.image || "https://via.placeholder.com/150"}
              width="60"
              height="60"
              className="d-inline-block align-top avatar"
              alt="User avatar"
            />
            <p>
              Tài khoản của{" "}
              <span className="name-profile">{user?.username}</span>
            </p>
          </div>
          <div className="profile-infor">
            <Link to={"/"}>
              <span>Thông tin tài khoản</span>
            </Link>
            <Link to={"/"}>
              <span>Thay đổi mật khẩu</span>
            </Link>
            <Link to={"/"}>
              <span>thông báo</span>
            </Link>
          </div>
        </Col>
        <Col md={8}>
          <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={user?.username}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Old Password:
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                New Password:
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button className="change-password-button" type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
