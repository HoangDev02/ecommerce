import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from '../authSlice'
import {deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess} from '../userSlide'


export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        console.log(process.env.REACT_APP_BACKEND_URL);
        const res  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/login`, user);
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
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}user/`,{
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
        const res = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}/user/delete/`+ id, {
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
      await axiosJWT.post(`${process.env.REACT_APP_BACKEND_URL}user/logout`, id, {
        headers: { token: ` ${accessToken}` },
      });
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logoutFailed());
    }
  };