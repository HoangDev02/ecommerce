import axios from "axios";
import {
  getCommentStart,
  getCommentSuccess,
  getCommentsFailed,
} from "../commentSlide";
export const postComment = async (data, axiosJWT, accessToken) => {
  try {
    const response = await axiosJWT.post(
      `${process.env.REACT_APP_BACKEND_URL}comment/create`,
      data,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};
export const deleteCommentById = async (commentId, axiosJWT, accessToken) => {
  try {
    const response = await axiosJWT.delete(
      `${process.env.REACT_APP_BACKEND_URL}comment/delete/${commentId}`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response.data);

  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};
export const getCommentsByUserId = async (productId, dispatch) => {
  dispatch(getCommentStart());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}comment/${productId}`
    );
    dispatch(getCommentSuccess(response.data));
  } catch (error) {
    dispatch(getCommentsFailed(error));
  }
};
export const updateCommentById = async (id, data, axiosJWT,accessToken) => {
  try {
    const response = await axiosJWT.put(
      `${process.env.REACT_APP_BACKEND_URL}comment/update/${id}`,
      data,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

