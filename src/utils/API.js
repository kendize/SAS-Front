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
    console.log("No error interceptor")
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
          });

      console.log(error.config.url)
      const accessToken = localStorage.getItem("accessToken")

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        return apiClient(originalRequest);
    }
    return Promise.reject(error)
  },
);

apiClient.interceptors.request.use(req => {

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
  return req;
});

export { apiClient };
