import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from 'react';
import Registration from '../Registration/Registration';
import Dashboard from '../Dashboard/Dashboard'
import Home from '../../Home'
import Login from '../Login/Login'

import {Breadcrumb} from 'antd';

class NavigationBar extends React.Component{
    render(){
        return <div>
                    <Breadcrumb>
                        <Router>
                        <Breadcrumb.Item>
                            <Link to="/">Головна</Link>  
                        </Breadcrumb.Item>
                            
                            <Breadcrumb.Item>
                                <Link to="/Dashboard">Адмін панель</Link>
                            </Breadcrumb.Item>
                            
                            <Breadcrumb.Item>
                                <Link to="/Login">Аутентифікація</Link>
                            </Breadcrumb.Item>
                           
                            <Breadcrumb.Item>
                                <Link to="/Registration">Реєстрація</Link>
                            </Breadcrumb.Item>

                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/Dashboard" component={Dashboard} />
                                <Route path="/Login" component={Login} />
                                <Route path="/Registration" component={Registration} />
                            </Switch>

                        </Router>
                    </Breadcrumb>
                </div>;
    }
}
export default NavigationBar