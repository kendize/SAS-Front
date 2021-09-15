import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, notification, Input, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../store/actions';
import { useHistory } from "react-router-dom";
import { apiClient } from '../../utils/API';
import { createFromIconfontCN } from '@ant-design/icons';
import authenticationService from '../../services/authenticationService';
import { FacebookOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import { isAdmin } from '../../utils';
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  const handleFacebookLogin = async () => {
    const { authResponse } = await new Promise(window.FB.login);

    if (!authResponse) return;
    const accessToken = authResponse.accessToken;
    const response = authenticationService.handleFacebookLogin(accessToken)
      .then(
        (response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          dispatch({
            type: LOGIN,
            payload: response.data,
            authorized: true,
            role: jwtDecode(localStorage.getItem("accessToken"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          })
          console.log(jwtDecode(localStorage.getItem("accessToken")))
          notification.success(
            {
              message: "Success",
              description: "Authenticated via Facebook!",
              duration: 2
            }
          )
          history.push('/')
        }
      )
  }

  const handleSubmit = () => {
    const response = authenticationService.handleLogin(Email, Password)
      .then(
        (response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          dispatch({
            type: LOGIN,
            payload: response.data,
            authorized: true,
            isAdmin: isAdmin()
          })
          history.push('/')
          notification.success(
            {
              message: "Success",
              description: "Successfully authenticated!",
              duration: 2
            }
          )
        })
      .catch(function (error) {
        console.log(error)
        notification.error(
          {
            message: "Error",
            description: "Wrong Email or Password",
            duration: 2
          }
        )
      });
  }

  return (
    <div align="center">
      <Card style={{ width: "500px" }}>
        <Form>
          <Form.Item>
            <Input
              type="text"
              value={Email}
              placeholder="Email"
              onChange={event => setEmail(event.target.value)}
              style={{ width: '80%' }}
            />
          </Form.Item>

          <Form.Item>
            <Input
              type="password"
              value={Password}
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
              style={{ width: '80%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="middle"
              type="primary"
              onClick={handleSubmit}
              style={{ background: "#32CD32", borderColor: "black" , width: '50%'}}
            >
              Login
            </Button>
          </Form.Item>
          <p>or</p>
          <Form.Item>
            <Button
              size="middle"
              type="primary"
              onClick={() => handleFacebookLogin()}
              style={{ width: '50%' }}
            >
              <IconFont type="icon-facebook" style={{ fontSize: 22 }} />

              Facebook
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
