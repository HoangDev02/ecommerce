import axios from "axios";

export const createBanner = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}banners/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error creating banner:", error);
  }
};
export const getBanner = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}banners`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error getting banner:", error);
  }
};
