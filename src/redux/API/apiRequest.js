import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from '../authSlice'
import {deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess} from '../userSlide'

export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/login`, user,
        { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        if(res.data.isAdmin) {
           navigate('/admin')
        }else if(res.data.status === false){
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
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/register`, user);
        dispatch(registerSuccess())
        navigate('/login')
    }catch(err){
        dispatch(registerFailed())
    };
};

export const getAllUsers = async(accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}user`,{
            headers: { authorization: `Bearer ${accessToken}`},
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err) {
        dispatch( getUsersFailed())
    }
};

export const deleteUser = async(accessToken,dispatch,id,axiosJWT) => {
    dispatch(deleteUsersStart());
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}user/delete/`+ id, {
            headers: { authorization: `Bearer ${accessToken}`}
        })
        dispatch(deleteUsersSuccess(res.data))
    } catch (error) {
        dispatch(deleteUsersFailed())
    }
}
export const logOut = async (dispatch, navigate,accessToken,axiosJWT) => {
    dispatch(logoutStart());
    try {
      const response = await axiosJWT.post(`${process.env.REACT_APP_BACKEND_URL}user/logout`, {
        headers: { authorization: `Bearer ${accessToken}`}
    });
      if (response.status === 200) {
        dispatch(logoutSuccess());
        navigate("/login");
      }
    } catch (err) {
      dispatch(logoutFailed());
    }
};