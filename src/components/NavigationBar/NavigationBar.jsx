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
import { Breadcrumb, Button, Menu } from 'antd';
import { logout } from "../../store/actionCreators/Authentication";
import PublicRoute from "../../utils/PublicRoute";
import PrivateRoute from "../../utils/PrivateRoute";
import { isLogin } from "../../utils";
import store from "../../store/store";
import Courses from "../Courses/Courses";

const { SubMenu } = Menu;


const NavigationBar = () => {
    const dispatch = useDispatch();
    const state = useSelector(
        (state) => {
            return {
                authorized: state.authentication.authorized
            }
        }
    )
    const auth = state.authorized
    return (
        <div>
            <Breadcrumb>
                <Router>
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    {auth ?
                        <>
                            <Breadcrumb.Item overlay={
                                <Menu>
                                    <Menu.Item>
                                        <Link to="/UserDashboard">Users</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/CourseDashboard">Courses</Link>
                                    </Menu.Item>
                                </Menu>
                            }>
                                Dashboards
                            </Breadcrumb.Item>

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



                    <Switch>
                        <PublicRoute exact path="/" component={Home} />
                        <PrivateRoute path="/UserDashboard" component={UserDashboard} />
                        <PrivateRoute path="/CourseDashboard" component={CourseDashboard} />
                        <PublicRoute path="/Courses" component={Courses} />
                        <PublicRoute path="/Login" component={Login} />
                        <PublicRoute path="/Registration" component={Registration} />
                    </Switch>

                </Router>
            </Breadcrumb>
        </div>
    )
}

export default NavigationBar;