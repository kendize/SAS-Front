import axios from "axios";

import {useDispatch} from 'react-redux'
import { logout } from "../store/actionCreators/Authentication";

const apiClient = axios.create({
  baseURL: "https://localhost:44349/",
  responseType: "json"
});

apiClient.interceptors.response.use(
  async (res) => {
    const accessToken = localStorage.getItem("accessToken")
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Interceptor error 401")
      const refreshToken = localStorage.getItem("refreshToken");
      apiClient.post(`https://localhost:44349/api/authentication/reauthenticate`, {refreshToken}, {
          headers: {"Accept": "application/json",}
        })
          .then(response  => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                const accessToken = 'Bearer ' + localStorage.getItem("accessToken")
                originalRequest.headers['Authorization'] = accessToken;
                return apiClient(originalRequest);
          });
        
    }
    return Promise.reject(error)
  }
);

apiClient.interceptors.request.use(req => {
  axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
  return req;
});

export { apiClient };
