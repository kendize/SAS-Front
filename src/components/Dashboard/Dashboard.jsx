
import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col } from 'antd';
import { get_page_of_users, get_pagination_info } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';
const { Search } = Input;
export default function Dashboard() {
  const dispatch = useDispatch();
  const userList = useSelector((store) => store.dashboard.userList);
  const [Data, setData] = useState(userList);
  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfUsers, setNumberOfUsers] = useState(1)
  const [orderColumnName, setOrderColumnName] = useState("Id")
  const [orderBy, setOrderBy] = useState("ascend")
  const [pageSize, setPageSize] = useState(5)
  const [searchString, setSearchString] = useState("")


  const handleDelete = (id) => {
    apiClient.delete(`https://localhost:44349/api/admin/${id}`).finally(() => {
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
    console.log(sorter.field)
    console.log(sorter.order)
    console.log(pagination)
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
    console.log(userList)
  }, [store.getState().dashboard.userList, store.getState().dashboard.numberOfUsers, currentPage, numberOfUsers])
  const total = store.getState().dashboard.numberOfUsers

  const dashboardColumns = [
    {
      title: "Id",
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortDirections: ['ascend', 'descend', 'ascend']
    },
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
        onExpand={(expanded, record) => { console.log(expanded + "|" + record.id) }}
        expandedRowKeys={userList.map(item => item.key)}
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
