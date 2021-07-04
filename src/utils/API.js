import axios from "axios";
import { relogin } from "../store/actionCreators/Authentication";
import { LOGOUT } from "../store/actions";
import store from '../store/store'

const apiClient = axios.create({
  baseURL: "https://localhost:44349/",
  responseType: "json"
});

apiClient.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Interceptor error 401")
      const accessToken = store.dispatch(relogin(localStorage.getItem("refreshToken")));
      console.log(error.config.url)
      const accessToken2 = localStorage.getItem("accessToken")
      //console.log("New Refresh token: "+ localStorage.getItem("refreshToken"))
      //console.log("New Access token: "+ localStorage.getItem("accessToken"))
      //if (accessToken2) {
        apiClient.defaults.headers.common['Authorization'] = localStorage.getItem("accessToken");
        return originalRequest;
      //} 
      //else {
      //  store.commit(LOGOUT);
      //}
    }
    //Promise.reject(error)
    return Promise.reject(error)
  },
);

//apiClient.interceptors.request.use(req => {
//
//  req.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
//  return req;
//});

export { apiClient };
