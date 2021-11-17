import axios from "axios";
import { getAccessToken } from "./utils/utils";

export const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export const URL_HOSTNAME = process.env.REACT_APP_URL_HOSTNAME;
export const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const endpoint = axios.create({
  baseURL: APP_BASE_URL + "/api/v1",
});

endpoint.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = "Bearer " + getAccessToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

endpoint.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    if (error.response.status === 401 && error?.config?.url !== "/auth/login") {
      localStorage.clear();
      window.location.href = "/";
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default endpoint;
