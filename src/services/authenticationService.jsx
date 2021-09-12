import { apiClient } from "../utils/API";
import { LOGIN } from "../store/actions";


const authenticationService = {

  handleFacebookLogin: async (dispatch, history) => {

    const { authResponse } = await new Promise(window.FB.login);

    if (!authResponse) return;
    const accessToken = authResponse.accessToken;
    console.log("access Token: " + accessToken)
    const response = apiClient.get(`/api/authentication/authenticatefacebook`,
      { params: { accessToken: accessToken } }).then(
        (response) => {

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          dispatch({
            type: LOGIN,
            payload: response.data,
            authorized: true
          })
          history.push('/')
        }
      );


  }
}

export default authenticationService