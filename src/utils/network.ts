import axios from "axios";
import { store, logOut } from "../redux";
import { url, apiUrl } from "./uri";

axios.defaults.headers["Content-Type"] = "application/json";

// create axios instance
const service = axios.create({
  baseURL: `${url}${apiUrl}`,
  timeout: 60 * 1000,
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = store.getState().user.access;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor 
service.interceptors.response.use(
  (response) => {
    // throw 401 error because of invalid jwt token. refresh the page, clear the cache, and jump to login page
    if (response.data.code === 401 || response.data.code === 403) {
      store.dispatch(logOut());
      alert("Token expired or not using for a while. Please login again");
    }
    return response
  },
  (error) => {
    const { status } = error.response;

    if (status === 401 || status === 403) {
      store.dispatch(logOut());
      alert("Token expired or not using for a while. Please login again");
    } else {
      alert("Network issue found. Please try again later")
    }
    return Promise.reject(error);
  }
);

export default service;