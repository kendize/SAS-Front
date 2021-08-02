import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography, Image, Card, Row, DatePicker } from 'antd';
import { get_page_of_courses } from '../../store/actionCreators/Dashboard';
import { get_user_subscriptions } from '../../store/actionCreators/UserCourse';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';

export default function Courses() {
    const dispatch = useDispatch();
    const courseList = useSelector((store) => store.dashboard.courseList);
    const [Data, setData] = useState(courseList);
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfCourses, setNumberOfCourses] = useState(1)
    const [orderColumnName, setOrderColumnName] = useState("courseName")
    const [orderBy, setOrderBy] = useState("ascend")
    const [pageSize, setPageSize] = useState(100)
    const [searchString, setSearchString] = useState("")
    const [date, setDate] = useState("")

    const userCourse = useSelector(
        (state) => {
            return {
                userCourse: state.userCourse.userCourse
            }
        }
    )

    const isSubscribed = (courseId) => {
        return [...userCourse.userCourse].some(
            element => element.courseId == courseId
        );
    }

    const handleSubscribe = (courseId, studyDate) => {
        apiClient.post("/api/subscription/subscribe",
            {
                headers: {
                    "Accept": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                },

                CourseId: courseId,
                StudyDate: studyDate

            },
            //{ "Content-Type": "application/json" }
        )
            .then(
                () => {
                    dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString))
                    dispatch(get_user_subscriptions())
                }
            )
    }

    const handleUnSubscribe = (courseId) => {
        apiClient.post("/api/subscription/unsubscribe",
            {
                CourseId: courseId
            },
            { "Content-Type": "application/json" })
            .then(
                () => {
                    dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString))
                    dispatch(get_user_subscriptions())
                }
            )
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
        dispatch(get_user_subscriptions());
        //[...userCourse.userCourse].forEach(element => {
        //    console.log(element.courseId);
        //});
        console.log(userCourse)
    }, [])

    useEffect(() => {
        setData(courseList);
        setNumberOfCourses(store.getState().dashboard.numberOfCourses)
        setCurrentPage(currentPage)
    }, [store.getState().dashboard.courseList, store.getState().dashboard.numberOfCourses, currentPage, numberOfCourses])

    return (
        <div>
            <Row gutter={[16, 16]}
                align="middle"
                justify="space-around">
                {
                    courseList.map((element) => {
                        return (
                            <Col span={6} align="center">
                                <Card
                                    hoverable
                                    title={element.courseName}
                                    cover={

                                        <Image
                                            alt={element.id}
                                            src={element.courseImgUrl}
                                            width={"90%"}
                                            preview={false}
                                        />

                                    }
                                >
                                    <Space direction="vertical">
                                        {element.courseDescription}
                                        {isSubscribed(element.id) ?
                                        <Popconfirm
                                        title="Unsubscribe from course?"
                                        onConfirm={() => handleUnSubscribe(element.id)}
                                        onCancel={(e) => console.log(e)}//onClick={() => handleDelete(record.id)}
                                        okText="Yes"
                                        cancelText="No">
                                            <Button
                                                danger
                                                size="middle"
                                              >
                                                Unsubscribe
                                            </Button>
                                            </Popconfirm>
                                            :
                                            <>
                                                <DatePicker
                                                    onChange={(date, dateString) => setDate(dateString)}
                                                />
                                                <Button
                                                    size="middle"
                                                    type="primary"
                                                    onClick={() => handleSubscribe(element.id, date)}
                                                >
                                                    Subscribe
                                                </Button>
                                            </>
                                        }
                                    </Space>
                                </Card>
                            </Col>

                        )
                    })
                }
            </Row>
        </div>
    )
}