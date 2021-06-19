import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from './components/pages/Dashboard';
import Login from './components/login/login'
import About from './components/pages/About';
import Error404 from './components/Error404';
import Settings from './components/pages/Settings';
import Auth from './api/Auth';
import UrlHelper from './helpers/UrlHelper';


// import Dashboard from './components/pages/Dashboard';



export default function Routes() {
    // useEffect(() => {
    //     Auth.checkAuth((res) => {
    //         console.log(res.data.state);
    //         if (res.data.state == 0) {
    //             UrlHelper.fallback(props);
    //         }
    //     }, (err) => {
    //         console.log(err)
    //     });
    // }, []);

    return (
        <Switch>
            <Route exact path='/admin/login' component={Login} />
            <Route exact path='/admin/about' component={About} />
            <AuthenticatedRoute exact path='/admin' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/settings' component={Settings} />
            {/* Admin drawer  */}
            <AuthenticatedRoute exact path='/admin' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/allposts' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/addposts' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/edit/:id' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/order' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/order/manage/:id' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/prescription' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/notification/send' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/category' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/category/add' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/category/edit/:id' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/doctor-category' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/doctor-category/add' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/doctor-category/edit/:id' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/image-slider' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/image-slider/add' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/call-session' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/call-session/edit/:id' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/payment' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/payment/edit/:id' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/user' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/user/:id' component={Dashboard} />

            <AuthenticatedRoute exact path='/admin/wallet' component={Dashboard} />
            <AuthenticatedRoute exact path='/admin/wallet/:id' component={Dashboard} />



            <Route exact path="/*" component={Error404} />
        </Switch >
    );
}
