import axios from "axios";
import jwt_decode from "jwt-decode";

export const refreshToken = async (accessToken) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}user/refresh`,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      },
      {
        withCredentials: true,
      }
    );
    return res.data; // Return only the response data
  } catch (err) {
    console.error("Error refreshing token:", err);
    throw err;
  }
};
export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      if (!user || !user.accessToken) {
        console.error("No user or access token available");
        return config;
      }

      let date = new Date();
      let decodedToken;
      try {
        decodedToken = jwt_decode(user.accessToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        return config;
      }

      if (decodedToken.exp * 1000 < date.getTime()) {
        try {
          const data = await refreshToken(user.refreshToken);
          const refreshUser = {
            ...user,
            accessToken: data.accessToken,
          };
          dispatch(stateSuccess(refreshUser));
          config.headers["authorization"] = "Bearer " + data.accessToken;
        } catch (error) {
          console.error(
            "Error in request interceptor while refreshing token:",
            error
          );
        }
      }
      return config;
    },
    (error) => {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  );

  return newInstance;
};
