import axios from "axios";
export const changepassword = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}user/changepassword`,
        data
      );

    } catch (err) {
      console.log(err);
    }
  };
  