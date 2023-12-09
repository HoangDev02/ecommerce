import axios from 'axios';
import {getProductsFailed,getProductsSuccess, getProductsStart, getSingleProductStart, getSingleProductSuccess, updateProductStart, updateProductSuccess, updateProductFail, deleteProductStart, deleteProductSuccess, getSingleProducFailed} from '../productSlide'
import { deleteCartFails } from '../cartSlide';



export const getProductHome = async(dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/home`,)
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};
export const getProductAll = async(dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/`,)
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};
export const getProduct = async(dispatch, slug) => {
    dispatch(getSingleProductStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/${slug}`)
        dispatch(getSingleProductSuccess(res.data))
    }catch(err) {
        dispatch(getProductsFailed())
    }
}
export const updateProduct = async(product,dispatch,id,navigate,axiosJWT) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosJWT.put(`${process.env.REACT_APP_BACKEND_URL}product/update/${id}`, product)
        dispatch(updateProductSuccess(res.data))
        navigate('/admin/product')
    } catch (error) {
        dispatch(updateProductFail())
    }
}
export const ShowUpdateProduct = async(dispatch,id,navigate,axiosJWT) => {
    dispatch(getSingleProductStart());
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_BACKEND_URL}product/edit/${id}`)
        dispatch(getSingleProductSuccess(res.data))
        navigate(`/product/edit/${id}`)
    } catch (error) {
        dispatch(getSingleProducFailed())
    }
}
export const deleteProduct = async(accessToken,dispatch,id,axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}product/delete/${id}`, {
            headers: {authorization: `Bearer ${accessToken}`}
        })
        dispatch(deleteProductSuccess(res.data))
    } catch (error) {
        dispatch(deleteCartFails(error.response.data))
    }
}
