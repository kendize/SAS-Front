import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button, notification} from 'antd';

export default function Login() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = () => {
      axios.post("https://localhost:44349/api/authentication/authenticate", {Email, Password}, {
        "Content-Type": "application/json"
      })
      .then(function (response) {
        localStorage.setItem("access_Token", response.data.access_Token);
        localStorage.setItem("refresh_Token", response.data.refresh_Token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form>
      <Form.Item>
        <input
          type="text"
          value = {Email}
          placeholder = "Email"
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <input
          type="password"
          value = {Password}
          placeholder = "Password"
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          size = "middle"
          type = "primary"
          onClick = {handleSubmit}
        >
          Authenticate
        </Button>
      </Form.Item>
    </Form>
  );
}
