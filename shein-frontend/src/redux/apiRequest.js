import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import {deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess} from './userSlide'
export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res  = await axios.post("/user/login", user);
        dispatch(loginSuccess(res.data));
        if(res.data.isAdmin) {
           navigate('/admin')
        }else {
            navigate('/')
        }
    }catch(err){
        dispatch(loginFailed());
    }
};
export const registerUser = async(user,dispatch,navigate) => {
    dispatch(registerStart());
    try{
        await axios.post("/user/register", user);
        dispatch(registerSuccess())
        navigate('/login')
    }catch(err){
        dispatch(registerFailed())
    };
};

export const getAllUsers = async(accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get("/user/",{
            headers: {token: ` ${accessToken}`}
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err) {
        dispatch( getUsersFailed())
    }
};
export const deleteUser = async(accessToken,dispatch,id,axiosJWT) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete("/user/delete/"+ id, {
            headers: {token: `${accessToken}`}
        })
        dispatch(deleteUsersSuccess(res.data))
    } catch (error) {
        dispatch(deleteUsersFailed(error.response.data))
    }
}
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
      await axiosJWT.post("/user/logout", id, {
        headers: { token: ` ${accessToken}` },
      });
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailed());
    }
  };