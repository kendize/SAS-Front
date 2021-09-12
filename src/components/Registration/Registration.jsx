import React, { useState } from 'react';
import { Form, Button, notification, Space, Input, Card } from 'antd';
import { useHistory } from "react-router-dom";
import accountService from '../../services/accountService';
export default function Registration() {
  const history = useHistory();
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

    const response = accountService.handleRegistration(data);
  }

  return (
    
    <div align="center">
      <Card style= {{width: "30%"}}>
    <Form scrollToFirstError>
      <Form.Item
        name="email"
        rules={
          [
            {
              type: 'email',
              required: true,
              message: "Please, input valid E-mail!"
            }
          ]
        }>
        <Input
          type="text"

          value={Email}
          placeholder="Email"
          onChange={event => setEmail(event.target.value)}
          style={{ width: '80%' }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        type="password"
        rules={
          [
            {
              required: true,
              message: "Please, input password!"
            },
            {
              min: 5,
              message: "Password has to be at least 5 character"
            }
          ]
        }>
        <Input
          type="password"
          value={Password}
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
          style={{ width: '80%' }}
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="text"
          value={FirstName}
          placeholder="First Name"
          onChange={event => SetFirstName(event.target.value)}
          style={{ width: '80%' }}
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="text"
          value={LastName}
          placeholder="Last Name"
          onChange={event => SetLastName(event.target.value)}
          style={{ width: '80%' }}
        />
      </Form.Item>

      <Form.Item>
        <Input
          type="number"
          value={Age}
          placeholder="Age"
          onChange={event => SetAge(event.target.value)}
          style={{ width: '80%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button
        style={{ width: '50%' }}
          size="middle"
          type="primary"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </div>
  );
}
