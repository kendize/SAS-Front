import React, { useState, useEffect } from 'react';
import { Form, Button, Pagination, Table, Popconfirm, message, Input, Col, Space, Modal, Typography, Image, Card, Row, Spin } from 'antd';
import { get_page_of_courses } from '../../store/actionCreators/Dashboard';
import { get_user_subscriptions } from '../../store/actionCreators/UserCourse';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../utils/API';
import store from '../../store/store';
import jwtDecode from 'jwt-decode';
import CourseCard from './CourseCard';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
export default function Courses() {
    const dispatch = useDispatch();
    const antIcon = <SyncOutlined style={{ fontSize: 36 }} spin />;
    const courseList = useSelector((store) => store.dashboard.courseList);
    const isLoading = useSelector((store) => store.dashboard.loading);
    const [Data, setData] = useState(courseList);
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfCourses, setNumberOfCourses] = useState(1)
    const [orderColumnName, setOrderColumnName] = useState("courseName")
    const [orderBy, setOrderBy] = useState("ascend")
    const [pageSize, setPageSize] = useState(100)
    const [searchString, setSearchString] = useState("")
    //const [isLoading, setIsLoading] = useState(true)
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
        console.log(jwtDecode(localStorage.getItem("accessToken"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    }, [])

    useEffect(() => {
        setData(courseList);
        setNumberOfCourses(store.getState().dashboard.numberOfCourses)
        setCurrentPage(currentPage)
    }, [store.getState().dashboard.courseList, store.getState().dashboard.numberOfCourses, currentPage, numberOfCourses])


    return (
        <div>
            <br/>
            <Spin 
            indicator={antIcon}
            size="large"
            spinning={isLoading}>
                <Row gutter={[16, 16]}
                    //type="flex"
                    align="middle"
                //justify="space-around"
                >
                    
                    {
                        
                        courseList.map((element) => {
                            return (
                                <Col span={6} align="center">

                                    <CourseCard
                                        element={element}
                                        loading={isLoading} />

                                </Col>

                            )
                        })
                    }
                </Row>
            </Spin>
        </div>
    )
}