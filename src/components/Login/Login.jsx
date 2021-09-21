import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, notification, Input, Card, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../store/actions';
import { Link, useHistory } from "react-router-dom";
import { apiClient } from '../../utils/API';
import { createFromIconfontCN } from '@ant-design/icons';
import authenticationService from '../../services/authenticationService';
import { FacebookOutlined, LoginOutlined } from '@ant-design/icons';
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
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("age", response.data.age)
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
              duration: 2,
              placement: 'bottomRight'
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
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("age", response.data.age)
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
              duration: 2,
              placement: 'bottomRight'
            }
          )
        })
      .catch(function (error) {
        console.log(error)
        notification.error(
          {
            message: "Error",
            description: "Wrong Email or Password",
            duration: 2,
            placement: 'bottomRight'
          }
        )
      });
  }

  return (
    <div align="center">
      <Card style={{ width: "35%", borderRadius: "25px" }}>
        <h3>Sign In to <b>SAS</b></h3>
        <h5>New here? <Link to="/Registration">Register now!</Link></h5>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16, }}
          autoComplete="off">
          <Form.Item label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your E-Mail!' },]}>
            <Input
              type="text"
              value={Email}
              placeholder="Email"
              onChange={event => setEmail(event.target.value)}
            //style={{ width: '80%' }}
            />
          </Form.Item>

          <Form.Item label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
            name="password">
            <Input.Password
              type="password"
              value={Password}
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}

            //style={{ width: '80%' }}
            />
          </Form.Item>
          <Space direction="horizontal" align="baseline" size="middle">
            <Form.Item>
              <Button
                size="middle"
                type="primary"
                onClick={handleSubmit}
              //style={{  borderColor: "black", width: '80%'}}
              >

                <LoginOutlined style={{ fontSize: 22 }} />
                Login
              </Button>
            </Form.Item>
            or
            <Form.Item>
              <Button
                size="middle"
                type="primary"
                onClick={() => handleFacebookLogin()}
              //style={{ width: '80%' }}
              >

                <FacebookOutlined style={{ fontSize: 22 }} />
                Facebook
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
      <br />
    </div>
  );
}
