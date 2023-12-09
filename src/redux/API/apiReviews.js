import axios from "axios";
import { getReviewsFailed, getReviewsStart, getReviewsSuccess } from '../reviewsSlide'
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}review/create`, reviewData);
    console.log(response.data);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

export const getProductReviewsById = async (productId,dispatch) => {
  dispatch(getReviewsStart())
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}review/${productId}`);
    dispatch(getReviewsSuccess(response.data))
  } catch (error) {
    dispatch(getReviewsFailed(error))

  }
};

export const getReviewById = async (slug) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}review/${slug}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error getting review by ID:", error);
  }
};

export const updateReview = async (id, updatedData,axiosJWT) => {
  try {
    const response = await axiosJWT.put(`${process.env.REACT_APP_BACKEND_URL}review/update/${id}`, updatedData);
    console.log(response.data);
  } catch (error) {
    console.error("Error updating review:", error);
  }
};
export const deleteReview = async (id,axiosJWT) => {
  try {
    const response = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}review/delete/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error("Error deleting review:", error);
  }
};
