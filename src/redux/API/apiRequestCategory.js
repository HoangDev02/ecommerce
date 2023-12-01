import axios from 'axios';
import {getCategoryFailed,getCategorySuccess,getCategoryStart, getDetailCategoryStart, getDetailCategorySuccess, getDetailCategoryFailed, getSuggestCategoryFailed,getSuggestCategorySuccess,getSuggestCategoryStart} from '../categorySlice'
export const getCategoryHome = async(dispatch) => {
    dispatch(getCategoryStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/newcategory`,)
        dispatch(getCategorySuccess(res.data))
    }catch(err) {
        dispatch(getCategoryFailed())
    }
};
export const getCategory = async(dispatch,slug) => {
    dispatch(getDetailCategoryStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/${slug}`,)
        dispatch(getDetailCategorySuccess(res.data))
    }catch(err) {
        dispatch(getDetailCategoryFailed(err))
    }
};
export const getSuggestCategory = async(dispatch) => {
    dispatch(getSuggestCategoryStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/suggest`,)
        dispatch(getSuggestCategorySuccess(res.data))
    }catch(err) {
        dispatch(getDetailCategoryFailed(err))
    }
};