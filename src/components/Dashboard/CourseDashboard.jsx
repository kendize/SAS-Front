import React, { useState, useEffect } from 'react';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Row, Col, Space, Modal, Typography, Image, Spin } from 'antd';
import { get_page_of_courses } from '../../store/actionCreators/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';
import { isAdmin } from '../../utils';
import { Redirect } from 'react-router';
import { RELOAD } from '../../store/actions';
const { Search } = Input;
const { TextArea } = Input;
const { Text } = Typography;

export default function CourseDashboard() {
    const antIcon = <SyncOutlined style={{ fontSize: 36 }} spin />;
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
    const isLoading = useSelector((store) => store.dashboard.coursesLoading);
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
        dispatch(
            {
                type: RELOAD
            }
        )
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
        dispatch(
            {
                type: RELOAD
            }
        )
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
        dispatch(
            {
                type: RELOAD
            }
        )
        apiClient.delete(`https://localhost:44349/api/course/${id}`).finally(() => {
            console.log(id);
            setCurrentPage(1);
            dispatch(get_page_of_courses(1, pageSize, orderColumnName, orderBy, searchString));
            setNumberOfCourses(store.getState().dashboard.numberOfCourses)
            setData(courseList);

        })
    }

    const handleSorting = (pagination, filters, sorter) => {
        dispatch(
            {
                type: RELOAD
            }
        )
        setOrderColumnName(sorter.field)
        setOrderBy(sorter.order)
        dispatch(get_page_of_courses(currentPage, pageSize, sorter.field, sorter.order, searchString))
        console.log(sorter.field)
        console.log(sorter.order)
        console.log(pagination)
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
            sortDirections: ['ascend', 'descend', 'ascend'],
            width: "75%"
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
                    visible={editCourseVisible}
                    title="Edit course"
                    closable={false}
                    onCancel={hideEditCourseModal}
                    onOk={handleEditCourseModal}

                >
                    <Form>
                        <Space direction="vertical" align="start">
                            <Space direction="vertical">
                                <Text>Course Name</Text>
                                <Form.Item>
                                    <Input
                                        type="text"
                                        value={courseName}
                                        placeholder="Course Name"
                                        onChange={event => setCourseName(event.target.value)}
                                        style={{ width: '400px' }}
                                    />
                                </Form.Item>
                            </Space>
                            <Space direction="vertical">
                                <Text>Course Description</Text>
                                <Form.Item>
                                    <Input
                                        type="text"
                                        value={courseDescription}
                                        placeholder="Course Description"
                                        onChange={event => setCourseDescription(event.target.value)}
                                        style={{ width: '400px' }}
                                    />
                                </Form.Item>
                            </Space>
                            <Space direction="vertical">
                                <Form.Item>
                                    <Text>Course Image URL</Text>
                                    <TextArea
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        type="text"
                                        value={courseImgUrl}
                                        placeholder="Course Image URL"
                                        onChange={event => setCourseImgUrl(event.target.value)}
                                        style={{ width: '400px' }}
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
                        <Space direction="vertical" align="start">
                            <Space direction="vertical">
                                <Text>Course Name</Text>
                                <Form.Item>
                                    <Input
                                        type="text"
                                        value={courseName}
                                        placeholder="Course Name"
                                        onChange={event => setCourseName(event.target.value)}
                                        style={{ width: '400px' }}
                                    />
                                </Form.Item>
                            </Space>
                            <Space direction="vertical">
                                <Text>Course Description</Text>
                                <Form.Item>
                                    <Input
                                        type="text"
                                        value={courseDescription}
                                        placeholder="Course Description"
                                        onChange={event => setCourseDescription(event.target.value)}
                                        style={{ width: '400px' }}
                                    />
                                </Form.Item>
                            </Space>
                            <Space direction="vertical">
                                <Form.Item>
                                    <Text>Course Image URL</Text>
                                    <TextArea
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        type="text"
                                        value={courseImgUrl}
                                        placeholder="Course Image URL"
                                        onChange={event => setCourseImgUrl(event.target.value)}
                                        style={{ width: '400px' }}
                                    />
                                </Form.Item>
                            </Space>
                        </Space>
                    </Form>
                </Modal>
                <Row>
                    <Col offset={1} span={22}>
                        <Search placeholder="Search by Name:" allowClear onSearch={(string) => {
                            handleChangeOfPage(currentPage, orderColumnName, orderBy, string)
                        }}
                            style={{ width: 200 }} /><br /><br />
                        <Spin
                            indicator={antIcon}
                            size="large"
                            spinning={isLoading}>
                            <Table
                                dataSource={courseList}
                                columns={dashboardColumns}
                                pagination={false}
                                onChange={handleSorting}
                                onExpand={(expanded, record) => { handleExpand(expanded, record); console.log(store.getState().authentication.authorized) }}
                                rowKey="id"
                                expandedRowKeys={expandedKey}
                                expandable={
                                    {
                                        expandedRowRender: (record) =>
                                            <div>
                                                <Image
                                                    width={300}
                                                    src={record.courseImgUrl}
                                                />
                                                <p>
                                                    <h4><b>Description: </b>
                                                    {record.courseDescription}</h4></p>
                                            </div>

                                    }
                                }

                            />
                        </Spin>
                        <br />
                        <Space align="end">

                            <Pagination сurrent={currentPage}
                                pageSize={5}
                                total={numberOfCourses}
                                onChange={(page) => handleChangeOfPage(page, orderColumnName, orderBy, searchString)} />
                            <Button
                                size="middle"
                                type="primary"
                                onClick={() => showCreateCourseModal()}
                            >
                                Create course
                            </Button>
                        </Space></Col>
                </Row>
            </div> : <Redirect exact to="/401" />}</>
    );

}
