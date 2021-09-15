import React, { useState, useEffect } from 'react';
import { get_page_of_courses } from '../../store/actionCreators/Dashboard';
import { get_user_subscriptions } from '../../store/actionCreators/UserCourse';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';
import jwtDecode from 'jwt-decode';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography, Image, Card, Row, DatePicker, Spin, Skeleton, notification } from 'antd';
import moment from 'moment';

const CourseCard = ({ element }) => {
    const [date, setDate] = useState("")
    const dispatch = useDispatch();
    const courseList = useSelector((store) => store.dashboard.courseList);
    const [Data, setData] = useState(courseList);
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfCourses, setNumberOfCourses] = useState(1)
    const [orderColumnName, setOrderColumnName] = useState("courseName")
    const [orderBy, setOrderBy] = useState("ascend")
    const [pageSize, setPageSize] = useState(100)
    const [searchString, setSearchString] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const userCourse = useSelector(
        (state) => {
            return {
                userCourse: state.userCourse.userCourse
            }
        }
    )

    useEffect(() => { console.log(date) }, [])
    const isSubscribed = (courseId) => {
        return [...userCourse.userCourse].some(
            element => element.courseId == courseId
        );
    }

    const handleSubscribe = (courseId, studyDate) => {
        setIsLoading(true)
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
                    notification.success(
                        {
                            message: "Success",
                            description: "Subscribed successfully!",
                            duration: 2
                        }
                    )
                }
            )
            .finally(
                () => {
                    setIsLoading(false)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                    notification.error(
                        {
                            message: "Error",
                            description: "Error occured, user was not subscribed",
                            duration: 2
                        }
                    )
                }
            )
    }

    const handleUnSubscribe = (courseId) => {
        setIsLoading(true)
        apiClient.post("/api/subscription/unsubscribe",
            {
                CourseId: courseId
            },
            { "Content-Type": "application/json" })
            .then(
                () => {
                    dispatch(get_page_of_courses(currentPage, pageSize, orderColumnName, orderBy, searchString))
                    dispatch(get_user_subscriptions())
                    notification.success(
                        {
                            message: "Success",
                            description: "Unsubscribed successfully!",
                            duration: 2
                        }
                    )
                }
            )
            .finally(
                () => {
                    setIsLoading(false)
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                    notification.error(
                        {
                            message: "Error",
                            description: "Error occured, user was not unsubscribed",
                            duration: 2
                        }
                    )
                }
            )
    }

    return (
        <Spin spinning={isLoading}>
            <Card
                key={element.id}
                hoverable
                title={element.courseName}
                style={{
                    width: '90%',
                    height: 500,
                }
                }
                cover={

                    <Image
                        alt={element.id}
                        src={element.courseImgUrl}
                        width={"80%"}
                        preview={false}
                    />
                }
            >
                <div>
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
                                onChange={(date, dateString) => { setDate(dateString) }}
                            //format={}
                            />
                            <Button
                                size="middle"
                                type="primary"
                                onClick={() => handleSubscribe(element.id, moment(date).format())}
                            >
                                Subscribe
                            </Button>
                        </>
                    }
                    
                </Space>
                </div>
            </Card>
        </Spin>
    )
}

export default CourseCard