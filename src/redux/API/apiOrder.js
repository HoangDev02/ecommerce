import { getOrderStart, getOrderSuccess, getOrdersFail } from "../orderSlide";

export const getOrder = async (accessToken, axiosJWT, dispatch) => {
  try {
    dispatch(getOrderStart());
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_BACKEND_URL}order`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(res);
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getOrdersFail());
  }
};
