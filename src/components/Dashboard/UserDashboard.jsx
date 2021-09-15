import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography, Spin } from 'antd';
import { get_page_of_users } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';
import { Redirect } from 'react-router';
import { isAdmin } from '../../utils';
import { RELOAD } from '../../store/actions';
const { Search } = Input;
const { Text } = Typography;


export default function UserDashboard() {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.dashboard.userList);
  const [Data, setData] = useState(userList);
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfUsers, setNumberOfUsers] = useState(1)
  const [orderColumnName, setOrderColumnName] = useState("Id")
  const [orderBy, setOrderBy] = useState("ascend")
  const [pageSize, setPageSize] = useState(5)
  const [searchString, setSearchString] = useState("")

  const [editUserVisible, setEditUserVisible] = useState(false);

  const [userId, setUserId] = useState("");
  const [Email, setEmail] = useState("")
  const [FirstName, setFirstName] = useState("")
  const [LastName, setLastName] = useState("")
  const [Age, setAge] = useState("")
  const isLoading = useSelector((store) => store.dashboard.usersLoading);
  const [expandedKey, setExpandedKey] = useState([])

  const handleExpand = (expanded, record) => {
    if (expanded) {
      setExpandedKey([record.id])
    }
    else {
      setExpandedKey("");
    }
  }

  const showEditUserModal = (record) => {
    setUserId(record.id);
    setEmail(record.email);
    setAge(record.age);
    setFirstName(record.firstName);
    setLastName(record.lastName);
    setEditUserVisible(true);

  };

  const hideEditUserModal = () => {
    setEditUserVisible(false);
  };

  const handleEditUserModal = () => {
    dispatch(
      {
        type: RELOAD
      }
    )
    apiClient.put("https://localhost:44349/api/admin", { id: userId, firstname: FirstName, lastname: LastName, age: Age, email: Email }, {
      "Content-Type": "application/json"
    })
      .then(function (response) {
        console.log(response);
        setEditUserVisible(false);
        dispatch(get_page_of_users(currentPage, pageSize, orderColumnName, orderBy, searchString));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const handleDelete = (id) => {
    dispatch(
      {
        type: RELOAD
      }
    )
    apiClient.delete(`https://localhost:44349/api/admin/${id}`,
      {
        headers: {
          "Accept": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
      })
      .finally(() => {
        setCurrentPage(1);
        dispatch(get_page_of_users(1, pageSize, orderColumnName, orderBy, searchString));
        setNumberOfUsers(store.getState().dashboard.numberOfUsers)
        setData(userList);

      })
  }

  const handleSorting = (pagination, filters, sorter) => {
    dispatch(
      {
        type: RELOAD
      }
    )
    //setCurrentPage(1);
    setOrderColumnName(sorter.field)
    setOrderBy(sorter.order)
    dispatch(get_page_of_users(currentPage, pageSize, sorter.field, sorter.order, searchString))

  }

  const handleChangeOfPage = (pageNumber, ColumnName, OrderBy, SearchString) => {
    dispatch(
      {
        type: RELOAD
      }
    )
    setOrderBy(OrderBy);
    setCurrentPage(pageNumber);
    setOrderColumnName(ColumnName);
    setSearchString(SearchString);
    dispatch(get_page_of_users(pageNumber, pageSize, ColumnName, OrderBy, SearchString));
    //setNumberOfUsers(store.getState().dashboard.numberOfUsers)// ?
    setData(userList);
    //console.log("Current Page: " + pageNumber)

  }

  useEffect(() => {
    dispatch(get_page_of_users(currentPage, pageSize, orderColumnName, orderBy, searchString));
  }, [])

  useEffect(() => {
    setData(userList);
    setNumberOfUsers(store.getState().dashboard.numberOfUsers)
    setCurrentPage(currentPage)
  }, [store.getState().dashboard.userList, store.getState().dashboard.numberOfUsers, currentPage, numberOfUsers])

  const dashboardColumns = [
    {
      title: "First Name",
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: "Last Name",
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: "Email",
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: "Age",
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: "Registered Date",
      dataIndex: 'registeredDate',
      key: 'registeredDate',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },

    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space align="center">
          <Button
            size="middle"
            type="primary"
            onClick={() => showEditUserModal(record)}
          >
            Edit user
          </Button>

          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={(e) => console.log(e)}//onClick={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No">
            <Button
              danger
              size="middle"
            >
              Delete
            </Button>

          </Popconfirm>
        </Space>
      ),
    },
  ];

  const expandedColumns = [
    {
      title: "Course Id",
      dataIndex: 'courseId',
      key: 'id',
      sortDirections: ['ascend', 'descend', 'ascend'],
      render: (record) => <p>{record}</p>
    },
    {
      title: "Course name",
      dataIndex: ["course", "courseName"],
      key: 'courseName',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: "Course Description",
      dataIndex: ["course", "courseDescription"],
      key: 'courseName',
      sortDirections: ['ascend', 'descend', 'ascend'],
    },
    {
      title: "Study Date",
      dataIndex: "studyDate",
      key: 'courseName',
      sortDirections: ['ascend', 'descend', 'ascend'],
    }
  ];

  const state = useSelector(
    (state) => {
      return {
        authorized: state.authentication.authorized,
        isAdmin: state.authentication.isAdmin
      }
    }
  )
  const isAdmin = state.isAdmin

  return (
    <>
      {isAdmin ? <div>
        <Modal
          visible={editUserVisible}
          title="Edit user"
          closable={false}
          onOk={handleEditUserModal}
          onCancel={hideEditUserModal}
        ><br />
          <Form>
            <Space direction="vertical" align="start">
              <Space direction="vertical">
                <Text>First Name</Text>
                <Form.Item>
                  <Input
                    type="text"
                    value={FirstName}
                    placeholder="First Name"
                    onChange={event => setFirstName(event.target.value)}
                    style={{ width: '400px' }}
                  />
                </Form.Item>
              </Space>
              <Space direction="vertical">
                <Text>Last Name</Text>
                <Form.Item>
                  <Input
                    type="text"
                    value={LastName}
                    placeholder="Last Name"
                    onChange={event => setLastName(event.target.value)}
                    style={{ width: '400px' }}
                  />
                </Form.Item>
              </Space>
              <Space direction="vertical">
                <Text>Email </Text>
                <Form.Item>

                  <Input
                    type="text"
                    value={Email}
                    placeholder="Email"
                    onChange={event => setEmail(event.target.value)}
                    style={{ width: '400px' }}
                  />
                </Form.Item>
              </Space>
              <Space direction="vertical">
                <Text>Age</Text>
                <Form.Item>
                  <Input
                    type="number"
                    value={Age}
                    placeholder="Age"
                    onChange={event => setAge(event.target.value)}
                    style={{ width: '400px' }}
                  />
                </Form.Item>
              </Space>
            </Space>
          </Form>
        </Modal><br/>
        <Search placeholder="search by email:" allowClear onSearch={(string) => {
          //setSearchString(string);
          handleChangeOfPage(currentPage, orderColumnName, orderBy, string)
          //dispatch(get_page_of_users(currentPage, pageSize, orderColumnName, orderBy, searchString))
        }
        } style={{ width: 200 }} /><br/><br />
        <Spin
          spinning={isLoading}>
          <Table
            dataSource={userList}
            columns={dashboardColumns}
            pagination={false}
            onChange={handleSorting}
            onExpand={(expanded, record) => { handleExpand(expanded, record); }}
            rowKey="id"
            expandedRowKeys={expandedKey}
            expandable={
              {
                expandedRowRender: (record) =>
                  <Table
                    dataSource={record.userCourses}
                    columns={expandedColumns}
                    pagination={false}
                    bordered

                  />
              }
            }

          /></Spin>

        <Pagination сurrent={currentPage}
          pageSize={5}
          total={numberOfUsers}//{store.getState().dashboard.numberOfUsers}
          onChange={(page) => handleChangeOfPage(page, orderColumnName, orderBy, searchString)} />
      </div> : <Redirect exact to="/401" />}</>
  );

}
