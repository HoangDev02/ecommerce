// User.jsx
import React, { useEffect } from 'react';
import './user.css'; // Make sure this path is correct for your project
import { deleteUser, getAllUsers } from '../../../redux/API/apiRequest';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../redux/createInstance';
import { loginSuccess } from '../../../redux/authSlice';

const User = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUser);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosInstance = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosInstance);
    }
  }, [user, dispatch, navigate]);

  const handleDeleteUser = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosInstance);
  };

  return (
    <main className="home-container">
      <div className="home-title">Users</div>
      <div className="user-table">
        {/* Table Header */}
        <div className="user-table-header">
          <div className="header-item">Account Status</div>
          <div className="header-item">User Name</div>
          <div className="header-item">Email</div>
          <div className="header-item">Action</div>
        </div>
        {/* User List */}
        {userList?.map((userItem) => (
          <div className="user-row" key={userItem._id}>
            <div className="user-status">
              <span className={`status-indicator`}></span>
              {userItem.status ? "Hoạt động" : "không hoạt động"}
            </div>
            <div className="user-info">
              <img src={userItem.image} alt="Avatar" className="user-avatar" />
              {userItem.username}
            </div>
            <div className="user-email">{userItem.email}</div>
            <div className="user-action" onClick={() => handleDeleteUser(userItem._id)}>Delete</div>
          </div>
        ))}
      </div>
      {msg && <div className="user-message">{msg}</div>}
      <button className="view-more-button">View More</button>
    </main>
  );
};

export default User;
