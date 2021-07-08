
import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message} from 'antd';
import { get_page_of_users, get_pagination_info } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';

export default function Dashboard() {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.dashboard.userList);
  const [Data, setData] = useState(userList);

  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfUsers, setNumberOfUsers] = useState(1)

  const handleDelete = (id) => {
    apiClient.delete(`https://localhost:44349/api/admin/${id}`).finally(() => {
      console.log(id);
      dispatch(get_page_of_users(currentPage));
      setNumberOfUsers(store.getState().dashboard.numberOfUsers)
      setData(userList);
    })
  }

  const handleChangeOfPage = (page) => {
    setCurrentPage(page);
    dispatch(get_page_of_users(page));
    setNumberOfUsers(store.getState().dashboard.numberOfUsers)// ?
    setData(userList);
    console.log("Current Page: " + page)
  }

  useEffect(() => {
    dispatch(get_page_of_users(currentPage));
  }, [])

  useEffect(() => {
    setData(store.getState().dashboard.userList);
    setNumberOfUsers(store.getState().dashboard.numberOfUsers)
    setCurrentPage(currentPage)
  }, [store.getState().dashboard.userList, currentPage, store.getState().dashboard.numberOfUsers])
  //const total = store.getState().dashboard.numberOfUsers

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredDate',
      key: 'registeredDate',
    },
    {
      title: 'Study Date',
      dataIndex: 'studyDate',
      key: 'studyDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Popconfirm
        title="Delete this user?" 
        onConfirm={() => handleDelete(record.id)}
        onCancel={(e) => console.log(e)}//onClick={() => handleDelete(record.id)}
        okText="Yes"
        cancelText="No">
        
            <Button
              size="middle"
              type="primary"
              >
              Видалити
            </Button>
          
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      

      <Table dataSource={userList} columns={columns}
      pagination={false} />

      <Pagination сurrent={currentPage}
        pageSize={5}
        total={numberOfUsers}//{store.getState().dashboard.numberOfUsers}
        onChange={(page) => handleChangeOfPage(page)} />
    </div>
  );

}
