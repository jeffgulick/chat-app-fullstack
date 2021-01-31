import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';


const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path = "/register" component={Register}/>
        </Switch>
    );
};

export default Router; 