import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button, notification} from 'antd';
import { apiClient } from '../../utils/API';

export default function Registration() {
  const [Email, setEmail] = useState("");
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Age, SetAge] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = () => {
    const data = {
      email: Email,
      firstname: FirstName,
      lastname: LastName,
      age: Age,
      password: Password
    }

    apiClient.post("https://localhost:44349/api/admin", data, {
      "Content-Type": "application/json"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(data);
      console.log(error);
    });
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
        <input
          type="text"
          value={FirstName}
          placeholder="First Name"
          onChange={event => SetFirstName(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <input
          type="text"
          value={LastName}
          placeholder="Last Name"
          onChange={event => SetLastName(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <input
          type="number"
          value={Age}
          placeholder="Age"
          onChange={event => SetAge(event.target.value)}
        />
      </Form.Item>

      <Form.Item>
        <Button
          size = "middle"
          type = "primary"
          onClick = {handleSubmit}
        >
          Registrate
        </Button>
      </Form.Item>
    </Form>
      );
}
