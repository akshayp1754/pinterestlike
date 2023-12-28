import axios from 'axios';
import store from "../../redux/stores";

const instance = axios.create({
    baseURL: import.meta.env.VITE_URL,
    // timeout: 15000,
    headers: {},
});

instance.interceptors.request.use({
    success: (config) => {
        return config;
    },
    error: (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
});

instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        store.dispatch({
          type: "LOGOUT",
        });
      }
      return Promise.reject(error);
    }
  );

export default instance;