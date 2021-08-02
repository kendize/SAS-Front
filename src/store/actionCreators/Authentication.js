import { apiClient } from '../../utils/API';
import { LOGIN, LOGOUT, RELOGIN } from '../actions';


export const login = ({ Email, Password }) => {
  return async (dispatch) => {
    await apiClient.post(`https://localhost:44349/api/authentication/authenticate`, { Email, Password }, {
      headers: { "Accept": "application/json", }

    })
      .then(response => {
        console.log(response)
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("Role", response.data.role);

        dispatch({
          type: LOGIN,
          payload: response.data,
          authorized: true
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
    await apiClient.post(`/api/authentication/reauthenticate`, { refreshToken }, {
      headers: { "Accept": "application/json", }
    })
      .then(response => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("Role", response.data.role);
        dispatch({
          type: RELOGIN,
          payload: response.data,
          authorized: true
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
  localStorage.removeItem("Role")
  return {
    type: LOGOUT,
    authorized: false
  }
}
