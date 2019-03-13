import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       
        localStorage.getItem('user')
            ? <Component {...props} />
            : <LoginPage {...props} />
    )} />
)