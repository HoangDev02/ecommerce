import { useEffect } from "react";
import "./user.css";
import { deleteUser, getAllUsers } from "../../../redux/API/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../redux/createInstance";
import { loginSuccess } from "../../../redux/authSlice";

const User = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUser);
  const msg = useSelector((state) => state.users?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosInstance = createAxios(user, dispatch, loginSuccess);

  // Delete user
  const handleDeleteUser = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosInstance);
  };

  // Login and get user list
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosInstance) 
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.isAdmin ? "admin" : "user"}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => (
          <div className="user-container" key={user._id}>
            <div className="home-user">{user.username}</div>
            <div
              className="delete-user"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
      <div>{msg}</div>
      <div className=""></div>
    </main>
  );
};

export default User;
