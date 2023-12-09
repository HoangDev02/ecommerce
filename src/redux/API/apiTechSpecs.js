import axios from "axios";
import { getTechSpecsFailed, getTechSpecsStart, getTechSpecsSuccess } from "../techSpecsSlide";

export const getTechSpecs = async (productId,dispatch) => {
  dispatch(getTechSpecsStart())
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}techSpecs?productId=${productId}`
    );
    dispatch(getTechSpecsSuccess(response.data))
  } catch (error) {
   dispatch(getTechSpecsFailed(error))
  }
};
export const createTechSpec = async (techSpecData,axiosJWT) => {
  try {
    const response = await axiosJWT.post(
      `${process.env.REACT_APP_BACKEND_URL}techSpecs/create`,
      techSpecData
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error creating tech spec:", error);
  }
};
export const updateTechSpecs = async (id, updatedData,axiosJWT) => {
  try {
    const response = await axiosJWT.put(
      `${process.env.REACT_APP_BACKEND_URL}techSpecs/update/${id}`,
      updatedData
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error updating tech specs:", error);
  }
};
export const deleteTechSpec = async (id,axiosJWT) => {
  try {
    const response = await axiosJWT.delete(
      `${process.env.REACT_APP_BACKEND_URL}techSpecs/delete/${id}`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error deleting tech spec:", error);
  }
};
