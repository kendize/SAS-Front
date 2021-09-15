import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Registration from '../Registration/Registration';
import UserDashboard from '../Dashboard/UserDashboard'
import CourseDashboard from '../Dashboard/CourseDashboard'
import Home from '../../Home'
import Login from '../Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Menu, Row, Col, Space, Card } from 'antd';
import { logout } from "../../store/actionCreators/Authentication";
import PublicRoute from "../../utils/PublicRoute";
import PrivateRoute from "../../utils/PrivateRoute";
import { getFirstName, getLastName, isLogin } from "../../utils";
import store from "../../store/store";
import Courses from "../Courses/Courses";
import EmailConfirmation from "../Profile/EmailConfirmation";
import axios from "axios";
import Error_401 from "../Errors/401";

const { SubMenu } = Menu;


const NavigationBar = () => {
    const dispatch = useDispatch();
    const state = useSelector(
        (state) => {
            return {
                authorized: state.authentication.authorized,
                isAdmin: state.authentication.isAdmin
            }
        }
    )
    const test = () => {
        axios.get("https://localhost:44349/Hangfire",
            { headers: { "Authorization": 'Bearer ' + localStorage.getItem("accessToken"), } }
        )
        //axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
    }
    const auth = state.authorized

    const isAdmin = state.isAdmin

    return (
        <div>
            <Router>
                <Row>
                    <Col span={12}>
                        <Breadcrumb>

                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            {auth ?
                                <>
                                    {isAdmin ?
                                        <>
                                            <Breadcrumb.Item overlay={
                                                <Menu>
                                                    <Menu.Item>
                                                        <Link to="/UserDashboard">Users</Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link to="/CourseDashboard">Courses</Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <a href="https://localhost:44349/Hangfire" onClick={() => test()}>Hangfire</a>
                                                    </Menu.Item>
                                                </Menu>
                                            }>
                                                Dashboards

                                            </Breadcrumb.Item>
                                        </>
                                        :
                                        <span></span>}

                                    <Breadcrumb.Item>
                                        <Link to="/Courses">Courses</Link>
                                    </Breadcrumb.Item>

                                    <Breadcrumb.Item>
                                        <Button
                                            onClick={() => {
                                                dispatch(logout())
                                            }}>Logout</Button>
                                    </Breadcrumb.Item>
                                </>
                                :
                                <>
                                    <Breadcrumb.Item>
                                        <Link to="/Login">Authentication</Link>
                                    </Breadcrumb.Item>

                                    <Breadcrumb.Item>
                                        <Link to="/Registration">Registration</Link>
                                    </Breadcrumb.Item>
                                </>
                            }
                        </Breadcrumb>
                    </Col>
                    
                </Row>
                <Switch>
                    <PublicRoute exact path="/" component={Home} />
                    <PrivateRoute path="/UserDashboard" component={UserDashboard} />
                    <PrivateRoute path="/CourseDashboard" component={CourseDashboard} />
                    <PublicRoute path="/Courses" component={Courses} />
                    <PublicRoute path="/Login" component={Login} />
                    <PublicRoute path="/Registration" component={Registration} />
                    <PublicRoute exact path="/EmailConfirmation/:userid&:code" component={EmailConfirmation} />
                    <PublicRoute path="/401" component={Error_401} />
                </Switch>
            </Router>
        </div>
    )
}

export default NavigationBar;