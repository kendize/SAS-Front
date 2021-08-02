import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography, Image } from 'antd';
import { get_page_of_courses } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';

const { Search } = Input;
const { Text } = Typography;

export default function CourseDashboard() {
    const dispatch = useDispatch();
    const courseList = useSelector((store) => store.dashboard.courseList);
    const [Data, setData] = useState(courseList);
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfCourses, setNumberOfCourses] = useState(1)
    const [orderColumnName, setOrderColumnName] = useState("Id")
    const [orderBy, setOrderBy] = useState("ascend")
    const [pageSize, setPageSize] = useState(5)
    const [searchString, setSearchString] = useState("")

    const [editCourseVisible, setEditCourseVisible] = useState(false);
    const [createCourseVisible, setCreateCourseVisible] = useState(false);

    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const [courseImgUrl, setCourseImgUrl] = useState("")

    const [expandedKey, setExpandedKey] = useState([])

    const handleExpand = (expanded, record) => {
        if (expanded) {
            setExpandedKey([record.id])
        }
        else {
            setExpandedKey("");
        }
    }

    const showEditCourseModal = (record) => {
        setCourseId(record.id);
        setCourseName(record.courseName);
        setCourseDescription(record.courseDescription);
        setCourseImgUrl(record.courseImgUrl);
        setEditCourseVisible(true);
    };

    const showCreateCourseModal = () => {
        setCourseId("");
        setCourseName("");
        setCourseDescription("");
        setCourseImgUrl("");
        setCreateCourseVisible(true);
    };

    const hideEditCourseModal = () => {
        setEditCourseVisible(false);
    };

    const hideCreateCourseModal = () => {
        setCreateCourseVisible(false);
    };

    const handleEditCourseModal = () => {
        apiClient.put("https://localhost:44349/api/course", { id: courseId, coursename: courseName, courseDescription: courseDescription, courseImgUrl: courseImgUrl }, {
            "Content-Type": "application/json"
        })
            .then(function (response) {
                console.log(response);
                setEditCourseVisible(false);
                dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleCreateCourseModal = () => {
        apiClient.post("https://localhost:44349/api/course", { coursename: courseName, courseDescription: courseDescription, courseImgUrl: courseImgUrl }, {
            "Content-Type": "application/json"
        })
            .then(function (response) {
                console.log(response);
                setCreateCourseVisible(false);
                dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleDelete = (id) => {
        apiClient.delete(`https://localhost:44349/api/course/${id}`).finally(() => {
            console.log(id);
            setCurrentPage(1);
            dispatch(get_page_of_courses(1, pageSize, orderColumnName, orderBy, searchString));
            setNumberOfCourses(store.getState().dashboard.numberOfCourses)
            setData(courseList);

        })
    }

    const handleSorting = (pagination, filters, sorter) => {
        //setCurrentPage(1);
        setOrderColumnName(sorter.field)
        setOrderBy(sorter.order)
        dispatch(get_page_of_courses(currentPage, pageSize, sorter.field, sorter.order, searchString))
        console.log(sorter.field)
        console.log(sorter.order)
        console.log(pagination)
    }

    const handleChangeOfPage = (pageNumber, ColumnName, OrderBy, SearchString) => {
        setOrderBy(OrderBy);
        setCurrentPage(pageNumber);
        setOrderColumnName(ColumnName);
        setSearchString(SearchString);
        dispatch(get_page_of_courses(pageNumber, pageSize, ColumnName, OrderBy, SearchString));
        //setNumberOfUsers(store.getState().dashboard.numberOfUsers)// ?
        setData(courseList);
        //console.log("Current Page: " + pageNumber)

    }

    useEffect(() => {
        dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString));
    }, [])

    useEffect(() => {
        setData(courseList);
        setNumberOfCourses(store.getState().dashboard.numberOfCourses)
        setCurrentPage(currentPage)
    }, [store.getState().dashboard.courseList, store.getState().dashboard.numberOfCourses, currentPage, numberOfCourses])

    const dashboardColumns = [
        {
            title: "Course Name",
            dataIndex: 'courseName',
            key: 'courseName',
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
                        onClick={() => showEditCourseModal(record)}
                    >
                        Edit course
                    </Button>

                    <Popconfirm
                        title="Delete this course?"
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

    return (
        <div>
            <Modal
                visible={editCourseVisible}
                title="Edit course"
                closable={false}
                onOk={handleEditCourseModal}
                onCancel={hideEditCourseModal}
            >
                <p><b>Course Id: </b>{courseId}</p>
                <Form>
                    <Space direction="vertical" align="end">
                        <Space align="baseline">
                            <Text>Course Name</Text>
                            <Form.Item>
                                <input
                                    type="text"
                                    value={courseName}
                                    placeholder="Course Name"
                                    onChange={event => setCourseName(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                        <Space align="baseline">
                            <Text>Course Description</Text>
                            <Form.Item>
                                <input
                                    type="text"
                                    value={courseDescription}
                                    placeholder="Course Description"
                                    onChange={event => setCourseDescription(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                        <Space align="baseline">
                            <Form.Item>
                                <Text>Course Image URL</Text>
                                <input
                                    type="text"
                                    value={courseImgUrl}
                                    placeholder="Course Image URL"
                                    onChange={event => setCourseImgUrl(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                    </Space>
                </Form>
            </Modal>

            <Modal
                visible={createCourseVisible}
                title="Create course"
                closable={false}
                onOk={handleCreateCourseModal}
                onCancel={hideCreateCourseModal}
            >
                <Form>
                    <Space direction="vertical" align="end">
                        <Space align="baseline">
                            <Text>Course Name</Text>
                            <Form.Item>
                                <input
                                    type="text"
                                    value={courseName}
                                    placeholder="Course Name"
                                    onChange={event => setCourseName(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                        <Space align="baseline">
                            <Text>Course Description</Text>
                            <Form.Item>
                                <input
                                    type="text"
                                    value={courseDescription}
                                    placeholder="Course Description"
                                    onChange={event => setCourseDescription(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                        <Space align="baseline">
                            <Form.Item>
                                <Text>Course Image URL</Text>
                                <input
                                    type="text"
                                    value={courseImgUrl}
                                    placeholder="Course Image URL"
                                    onChange={event => setCourseImgUrl(event.target.value)}
                                />
                            </Form.Item>
                        </Space>
                    </Space>
                </Form>
            </Modal>

            <Search placeholder="search by name:" onSearch={(string) => {
                //setSearchString(string);
                handleChangeOfPage(currentPage, orderColumnName, orderBy, string)
                //dispatch(get_page_of_users(currentPage, pageSize, orderColumnName, orderBy, searchString))
            }
            } style={{ width: 200 }} />

            <Table
                dataSource={courseList}
                columns={dashboardColumns}
                pagination={false}
                onChange={handleSorting}
                onExpand={(expanded, record) => { handleExpand(expanded, record); console.log(store.getState().authentication.authorized)}}
                rowKey="id"
                expandedRowKeys={expandedKey}
                expandable={
                    {
                        expandedRowRender: (record) =>
                            <div>
                                <Image
                                    width={200}
                                    src={record.courseImgUrl}
                                />
                                <p>
                                    <b>Description:</b>
                                    {record.courseDescription}</p>
                            </div>

                    }
                }

            />
            <Space align="end">
                <Pagination сurrent={currentPage}
                    pageSize={5}
                    total={numberOfCourses}//{store.getState().dashboard.numberOfUsers}
                    onChange={(page) => handleChangeOfPage(page, orderColumnName, orderBy, searchString)} />
                <Button
                    size="middle"
                    type="primary"
                    onClick={() => showCreateCourseModal()}
                >
                    Create course
                </Button>
            </Space>
        </div>
    );

}
