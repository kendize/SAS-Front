import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography } from 'antd';
import { get_page_of_users } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';

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
    apiClient.delete(`https://localhost:44349/api/admin/${id}`,
    {
      headers: {
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
      },
    })
    .finally(() => {
      console.log(id);
      setCurrentPage(1);
      dispatch(get_page_of_users(1, pageSize, orderColumnName, orderBy, searchString));
      setNumberOfUsers(store.getState().dashboard.numberOfUsers)
      setData(userList);

    })
  }

  const handleSorting = (pagination, filters, sorter) => {
    //setCurrentPage(1);
    setOrderColumnName(sorter.field)
    setOrderBy(sorter.order)
    dispatch(get_page_of_users(currentPage, pageSize, sorter.field, sorter.order, searchString))

  }

  const handleChangeOfPage = (pageNumber, ColumnName, OrderBy, SearchString) => {
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
  return (
    <div>
      <Modal
        visible={editUserVisible}
        title="Edit user"
        closable={false}
        onOk={handleEditUserModal}
        onCancel={hideEditUserModal}
      >
        <p><b>User Id: </b>{userId}</p>
        <Form>
          <Space direction="vertical" align="end">
            <Space align="baseline">
              <Text>First Name</Text>
              <Form.Item>
                <input
                  type="text"
                  value={FirstName}
                  placeholder="First Name"
                  onChange={event => setFirstName(event.target.value)}
                />
              </Form.Item>
            </Space>
            <Space align="baseline">
              <Text>Last Name</Text>
              <Form.Item>
                <input
                  type="text"
                  value={LastName}
                  placeholder="Last Name"
                  onChange={event => setLastName(event.target.value)}
                />
              </Form.Item>
            </Space>
            <Space align="baseline">
              <Form.Item>
                <Text>Email </Text>
                <input
                  type="text"
                  value={Email}
                  placeholder="Email"
                  onChange={event => setEmail(event.target.value)}
                />
              </Form.Item>
            </Space>
            <Space align="baseline">
              <Text>Age</Text>
              <Form.Item>
                <input
                  type="number"
                  value={Age}
                  placeholder="Age"
                  onChange={event => setAge(event.target.value)}
                />
              </Form.Item>
            </Space>
          </Space>
        </Form>
      </Modal>
      <Search placeholder="search by email:" onSearch={(string) => {
        //setSearchString(string);
        handleChangeOfPage(currentPage, orderColumnName, orderBy, string)
        //dispatch(get_page_of_users(currentPage, pageSize, orderColumnName, orderBy, searchString))
      }
      } style={{ width: 200 }} />

      <Table
        dataSource={userList}
        columns={dashboardColumns}
        pagination={false}
        onChange={handleSorting}
        onExpand={(expanded, record) => { handleExpand(expanded, record);}}
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

      />

      <Pagination сurrent={currentPage}
        pageSize={5}
        total={numberOfUsers}//{store.getState().dashboard.numberOfUsers}
        onChange={(page) => handleChangeOfPage(page, orderColumnName, orderBy, searchString)} />
    </div>
  );

}
