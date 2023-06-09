import axios from 'axios';
import {getProductsFailed,getProductsSuccess, getProductsStart, getSingleProductStart, getSingleProductSuccess, updateProductStart, updateProductSuccess, updateProductFail, deleteProductStart, deleteProductSuccess, getSingleProducFailed} from '../productSlide'
import { deleteCartFails } from '../cartSlide';



export const getProductHome = async(dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get("/product/home",)
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};
export const getProductAll = async(dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get("/product/",)
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};
export const getProduct = async(dispatch, slug) => {
    dispatch(getSingleProductStart());
    try{
        const res = await axios.get(`/product/${slug}`)
        dispatch(getSingleProductSuccess(res.data))
    }catch(err) {
        dispatch(getProductsFailed())
    }
}
export const updateProduct = async(product,dispatch,id,navigate) => {
    dispatch(updateProductStart());
    try {
        const res = await axios.put(`/product/update/${id}`, product)
        dispatch(updateProductSuccess(res.data))
        navigate('/admin/product')
    } catch (error) {
        dispatch(updateProductFail())
    }
}
export const ShowUpdateProduct = async(dispatch,id,navigate) => {
    dispatch(getSingleProductStart());
    try {
        const res = await axios.get(`/product/edit/${id}`)
        dispatch(getSingleProductSuccess(res.data))
        navigate(`/product/edit/${id}`)
    } catch (error) {
        dispatch(getSingleProducFailed())
    }
}
export const deleteProduct = async(accessToken,dispatch,id,axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`/product/delete/${id}`, {
            headers: {token: `${accessToken}`}
        })
        dispatch(deleteProductSuccess(res.data))
    } catch (error) {
        dispatch(deleteCartFails(error.response.data))
    }
}
