import React from 'react'
import { Route, Switch } from 'react-router'
import Reset from './components/pages/password_recovery/Reset'
import Home from './components/pages/Home';
import Landing from './components/pages/landing/Index';
import Update from './components/pages/update/Index';
import Error404 from './components/Error404';


// import Dashboard from './components/pages/Dashboard';

export default function Routes() {
    return (
        <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/' component={Landing} />
            <Route exact path='/forgot-password/:code' component={Reset} />
            <Route exact path="/update" component={Update} />
            <Route exact path="/*" component={Error404} />
        </Switch>
    );
}
