import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => localStorage.getItem("token") ? (
        <Component {...props} />
    ) : (
        <Redirect to={{ pathname: "/admin/login", state: { from: props.location } }} />
    )
    } />
);



//export default withRouter(AuthenticatedRoute);
export default AuthenticatedRoute;