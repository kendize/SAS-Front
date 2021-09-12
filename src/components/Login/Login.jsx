import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, notification, Input, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../store/actions';
import { useHistory } from "react-router-dom";
import { apiClient } from '../../utils/API';
import { createFromIconfontCN } from '@ant-design/icons';
import authenticationService from '../../services/authenticationService';
import {FacebookOutlined } from '@ant-design/icons';
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

  //const handleFacebookLogin = async () => {
  //  const { authResponse } = await new Promise(window.FB.login);
//
  //  if (!authResponse) return;
  //  const accessToken = authResponse.accessToken;
  //  console.log("access Token: " + accessToken)
  //  const response = apiClient.get(`/api/authentication/authenticatefacebook`,
  //    { params: { accessToken: accessToken } }).then(
  //      (response) => {
  //        console.log("response:" + response.data)
  //        localStorage.setItem("accessToken", response.data.accessToken);
  //        localStorage.setItem("refreshToken", response.data.refreshToken);
  //        localStorage.setItem("Role", response.data.role);
//
  //        dispatch({
  //          type: LOGIN,
  //          payload: response.data,
  //          authorized: true
  //        })
  //        history.push('/')
  //      }
  //    );
//
//
  //}

  const handleSubmit = () => {
    axios.post("https://localhost:44349/api/authentication/authenticate", { Email, Password }, {
      "Content-Type": "application/json"
    })
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        dispatch({
          type: LOGIN,
          payload: response.data,
          authorized: true
        })
        history.push('/')
        notification.success(
          {
            message: "Success",
            description: "Successfully authenticated!"
          }
        )
      })
      .catch(function (error) {
        notification.error(
          {
            message: "Error",
            description: "Wrong Email or Password"
          }
        )
      });
  }

  return (
    <div  align="center">
      <Card style= {{width: "30%"}}>
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
            style={{ width: '50%' }}
          >
            Authenticate
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            size="middle"
            type="primary"
            onClick={() => authenticationService.handleFacebookLogin(dispatch, history)}
            style={{ width: '50%' }}
          >
            <IconFont type="icon-facebook" style={{ fontSize: 22 }}/>

            Facebook
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
}
