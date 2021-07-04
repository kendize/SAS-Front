import axios from 'axios';
import { apiClient } from '../../utils/API';
import { LOGIN, LOGOUT, RELOGIN } from '../actions';


export const  login = ({Email, Password}) => {
    return async (dispatch) => {
        await apiClient.post(`https://localhost:44349/api/authentication/authenticate`, {Email, Password}, {
          headers: {"Accept": "application/json",}

        })
          .then(response  => {
                console.log(response)
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                dispatch({
                    type: LOGIN,
                    payload: response.data
                })
              }
          )
          .catch(
            error => console.log(error)
              )
      };
}

export const relogin = (refreshToken) => {
    return async (dispatch) => {
        await apiClient.post(`https://localhost:44349/api/authentication/reauthenticate`, {refreshToken}, {
          headers: {"Accept": "application/json",}
        })
          .then(response  => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                dispatch({
                    type: RELOGIN,
                    payload: response.data
                })
                return response.data.accessToken
              }
          )
          .catch(
            error => console.log(error)
              )
      };
}

export const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return {
            type: LOGOUT,
        }
    }
