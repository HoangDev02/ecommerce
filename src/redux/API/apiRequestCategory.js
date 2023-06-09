import axios from 'axios';
import {getCategoryFailed,getCategorySuccess,getCategoryStart} from '../categorySlice'
export const getCategoryHome = async(dispatch) => {
    dispatch(getCategoryStart());
    try{
        const res = await axios.get("/category/newcategory",)
        dispatch(getCategorySuccess(res.data))
    }catch(err) {
        dispatch(getCategoryFailed())
    }
};