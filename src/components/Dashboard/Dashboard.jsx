import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Form, Button, notification} from 'antd';
import { get_page_of_users } from '../../store/actionCreators/Dashboard';
import {useDispatch, useSelector} from 'react-redux';

export default function Dashboard()  {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.dashboard.userList);
  const [Data, setData] = useState(userList);
  

  const handleDelete = (id) => {
      axios.delete(`https://localhost:44349/api/admin/${id}`).finally(() => {
      console.log(id);
    })
  }


  //useEffect(() => {
  //  axios.get(`https://localhost:44349/api/admin`, {
  //  headers: {"Accept": "application/json",
  //            'Authorization': 'Bearer ' + localStorage.getItem("access_Token")}
  //  })
  //  .then(res => {
  //    setData(res.data);
  //    console.log(res.data);
  //  })
  //  .catch(
  //    error => console.log(error)
  //      )
  //}, [])
  useEffect( () => {
    dispatch(get_page_of_users());
  }, [])

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
