import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button} from 'antd';
import { useDispatch } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = () => {
    axios.post("https://localhost:44349/api/authentication/authenticate", {Email, Password}, {
      "Content-Type": "application/json"
    })
    .then(function (response) {
      console.log(response.data)
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    })
    .catch(function (error) {
      console.log(error);
    });
    //dispatch(login({ Email, Password }));
  }

  return (
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
    </Form>
  );
}
