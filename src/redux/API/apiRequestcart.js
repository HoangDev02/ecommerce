import axios from "axios";
import {
  addCartFailed,
  addCartSuccess,
  getCartFailed,
  getCartsStart,
  getCartsSuccess,
  addCartStart,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFails,
  updateCartQuantitySuccess,
  updateCartQuantityFailed,
  updateCartQuantityStart,
  updateProductQuantityInCart,
} from "../cartSlide";

export const getCart = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getCartsStart());
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_BACKEND_URL}cart/cart-buy-order-box`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(getCartsSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailed());
  }
};

export const getCarts = async (accessToken, dispatch) => {
  dispatch(getCartsStart());
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}cart/`, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
    console.log(res);
    dispatch(getCartsSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailed());
  }
};
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

export const addCart = async (product, dispatch, userId) => {
  dispatch(addCartStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}cart/${userId}`,
      product
    );
    dispatch(addCartSuccess(res.data));
    // navigate(`/cart/${userId}`)
  } catch (err) {
    dispatch(addCartFailed(err));
  }
};
export const deleteCart = async (product, dispatch, axiosJWT, accessToken) => {
  dispatch(deleteCartStart());
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_BACKEND_URL}cart/cart-delete-order-box`,
      {
        data: { productId: `${product}` },
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteCartSuccess(res.data));
  } catch (error) {
    dispatch(deleteCartFails(error.response.data));
  }
};
export const updateCartQuantity = async (
  axiosJWT,
  productId,
  quantity,
  dispatch,
  accessToken
) => {
  dispatch(updateCartQuantityStart());
  try {
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_BACKEND_URL}cart/cart-update-order-box`,
      { productId, quantity }, {
          headers: { authorization: `Bearer ${accessToken}` },
      }
      
    );
    dispatch(updateCartQuantitySuccess(res.data));
  } catch (error) {
    dispatch(updateCartQuantityFailed(error.response.data));
    throw error; // Rethrow the error to be caught in the component
  }
};
