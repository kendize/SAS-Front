import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../store/actions';
import { isLogin } from '../../utils';
import { useHistory } from "react-router-dom";
import { apiClient } from '../../utils/API';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleFacebookLogin = async () => {
    const { authResponse } = await new Promise(window.FB.login);

    if (!authResponse) return;
    const accessToken = authResponse.accessToken;
    console.log("access Token: " + accessToken)
    const response = apiClient.get(`/api/authentication/authenticatefacebook`,
      { params: { accessToken: accessToken } }).then(
        (response) => {
          console.log("response:" + response.data)
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("Role", response.data.role);

          dispatch({
            type: LOGIN,
            payload: response.data,
            authorized: true
          })
          history.push('/')
        }
      );


  }

  const handleSubmit = () => {
    axios.post("https://localhost:44349/api/authentication/authenticate", { Email, Password }, {
      "Content-Type": "application/json"
    })
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("Role", response.data.role);

        dispatch({
          type: LOGIN,
          payload: response.data,
          authorized: true
        })
        history.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
    //dispatch(login({ Email, Password }));
  }

  return (
    <>
      <Form>
        <Form.Item>
          <input
            type="text"
            value={Email}
            placeholder="Email"
            onChange={event => setEmail(event.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <input
            type="password"
            value={Password}
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="middle"
            type="primary"
            onClick={handleSubmit}
          >
            Authenticate
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            size="middle"
            type="primary"
            onClick={handleFacebookLogin}
          >
            Facebook
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
