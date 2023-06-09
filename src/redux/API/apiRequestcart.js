import axios from 'axios';
import {addCartFailed, addCartSuccess, getCartFailed,getCartsStart,getCartsSuccess, addCartStart, deleteCartStart, deleteCartSuccess, deleteCartFails, updateCartQuantitySuccess, updateCartQuantityFailed,updateCartQuantityStart,updateProductQuantityInCart} from '../cartSlide'


export const getCart = async(accessToken, dispatch,userId) => {
   dispatch(getCartsStart());
    try{
        const res = await axios.get(`/cart/${userId}`, {
            headers: {token: `${accessToken}`}
        })
        console.log(res);
        dispatch(getCartsSuccess(res.data))
    }catch(err) {
        dispatch(getCartFailed())
    }
}

export const getCarts = async(accessToken, dispatch) => {
    dispatch(getCartsStart());
     try{
         const res = await axios.get(`/cart/`, {
             headers: {token: `${accessToken}`}
         })
         console.log(res);
         dispatch(getCartsSuccess(res.data))
     }catch(err) {
         dispatch(getCartFailed())
     }
 }
//  export const addCart = async(accessToken,dispatch,userId,ProductId,quantity,getState) => {
//     dispatch(addCartStart());
//     try {
//         const res = await axios.post(`/cart/${userId}`, {
//             headers: {token: `${accessToken}`}
//         })
//         dispatch(addCartSuccess({
//            payload: {
//              ProductId,
//             name: res.name,
//             img: res.img,
//             price: res.price,
//             quantity
//            }
//         }))
//         localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems.cart))
//     } catch (error) {
//         dispatch(addCartFailed(error))
//     }
//  }

export const addCart = async(product, dispatch, navigate, userId) => {
    dispatch(addCartStart());
    try {
        const res = await axios.post(`/cart/${userId}`, product)
        dispatch(addCartSuccess(res.data))
        navigate(`/cart/${userId}`)
    }catch(err) {
        dispatch(addCartFailed(err))
    }
}
export const deleteCart = async(product,dispatch,userId) => {
    dispatch(deleteCartStart())
    try {
        const res = await axios.delete(`/cart/${userId}`,{
            data: {productId: `${product}`}
        })
        dispatch(deleteCartSuccess(res.data))
    } catch (error) {
        dispatch(deleteCartFails(error.response.data))
    }
}
export const updateCartQuantity = async (userId, productId, quantity, dispatch) => {
    dispatch(updateCartQuantityStart());
    try {
      const res = await axios.put(`/cart/${userId}`, { productId, quantity });
      dispatch(updateCartQuantitySuccess(res.data));
    } catch (error) {
      dispatch(updateCartQuantityFailed(error.response.data));
      throw error; // Rethrow the error to be caught in the component
    }
  };