import axios from 'axios';
import {getCategoryFailed,getCategorySuccess,getCategoryStart} from '../categorySlice'
export const getCategoryHome = async(dispatch) => {
    dispatch(getCategoryStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/newcategory`,)
        dispatch(getCategorySuccess(res.data))
    }catch(err) {
        dispatch(getCategoryFailed())
    }
};