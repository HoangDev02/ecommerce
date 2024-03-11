import axios from "axios";
import qs from "qs";

export const postVnpay= async (vnpaydata) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}vnpay/create_payment_url`,qs.stringify(vnpaydata),{withCredentials: true});
      console.log(response.data);
      return response;
    } catch (error) {
      console.error("Error getting banner:", error);
    }
  };
  