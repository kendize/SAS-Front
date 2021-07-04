import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Form, Button, notification} from 'antd';
import { get_page_of_users } from '../../store/actionCreators/Dashboard';
import {useDispatch, useSelector} from 'react-redux';
import { apiClient } from '../../utils/API';

export default function Dashboard()  {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.dashboard.userList);
  const [Data, setData] = useState(userList);


  const handleDelete = (id) => {
      apiClient.delete(`https://localhost:44349/api/admin/${id}`).finally(() => {
      console.log(id);
    })
  }
  useEffect( () => {
    dispatch(get_page_of_users());
    setData(userList);
  }, [dispatch])

return (
  <div>
      <table>
          <thead>
            <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Age</td>
                <td>Registered Date</td>
                <td>Study Date</td>
                <td>Action</td>
            </tr>
          </thead>
        <tbody>
          {Data && Data.map(user => (<tr key={user.id.toString()}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.registeredDate}</td>
            <td>{user.studyDate}</td>
            <td>
              <Form>
                <Form.Item>
                  <Button
                    size = "middle"
                    type = "primary"
                    onClick = {() => handleDelete(user.id)}>
                    Видалити
                  </Button>
                </Form.Item>
              </Form>
            </td>
          </tr>))}
        </tbody>
      </table>
  </div>
            );

}
