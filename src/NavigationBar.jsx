import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import React from 'react';
import Registration from './Registration';
import Dashboard from './Dashboard'
import Home from './Home'

class NavigationBar extends React.Component{
    render(){
        return <div>
            <Router>
                <Link to="/">Головна</Link>  
                <br />
                <Link to="/Dashboard">Адмін панель</Link>
                <br />
                <Link to="/Registration">Реєстрація</Link>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Registration" component={Registration} />
                    <Route path="/Dashboard" component={Dashboard} />
                </Switch>

            </Router>
                </div>;
    }
}
export default NavigationBar