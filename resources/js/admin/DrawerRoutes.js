import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';
import AllPost from './components/pages/posts/Index';
import AddPost from './components/pages/posts/Add';
import EditPost from './components/pages/posts/Edit';
import AllOrder from './components/pages/order/Index';
import ManageOrder from './components/pages/order/Edit';
import ManagePrescription from './components/pages/prescription/Index';
import AddNotification from './components/pages/notification/Add';

import Category from './components/pages/category/Index';
import AddCategory from './components/pages/category/Add';
import EditCategory from './components/pages/category/Edit';

import DoctorCategory from './components/pages/doctor_category/Index';
import AddDoctorCategory from './components/pages/doctor_category/Add';
import EditDoctorCategory from './components/pages/doctor_category/Edit';

import ImageSlider from './components/pages/image_slider/Index';
import AddImageSlider from './components/pages/image_slider/Add';

import CallSession from './components/pages/call_session/Index';
import EditCallSession from './components/pages/call_session/Edit';

import Payment from './components/pages/payment/Index';
import EditPayment from './components/pages/payment/Edit';

import User from './components/pages/user/Index';
import EditUser from './components/pages/user/User';

import Wallet from './components/pages/wallet/Index';
import EditWallet from './components/pages/wallet/Edit';

import Error404 from './components/Error404';
import Auth from './api/Auth';

export default function DrawerRoutes() {

    return (
        <Switch>
            <AuthenticatedRoute exact path='/admin' component={Home} />
            <AuthenticatedRoute exact path='/admin/allposts' component={AllPost} />
            <AuthenticatedRoute exact path='/admin/addposts' component={AddPost} />
            <AuthenticatedRoute exact path='/admin/edit/:id' component={EditPost} />
            <AuthenticatedRoute exact path='/admin/order' component={AllOrder} />
            <AuthenticatedRoute exact path='/admin/order/manage/:id' component={ManageOrder} />
            <AuthenticatedRoute exact path='/admin/prescription' component={ManagePrescription} />

            <AuthenticatedRoute exact path='/admin/category' component={Category} />
            <AuthenticatedRoute exact path='/admin/category/add' component={AddCategory} />
            <AuthenticatedRoute exact path='/admin/category/edit/:id' component={EditCategory} />

            <AuthenticatedRoute exact path='/admin/doctor-category' component={DoctorCategory} />
            <AuthenticatedRoute exact path='/admin/doctor-category/add' component={AddDoctorCategory} />
            <AuthenticatedRoute exact path='/admin/doctor-category/edit/:id' component={EditDoctorCategory} />

            <AuthenticatedRoute exact path='/admin/image-slider' component={ImageSlider} />
            <AuthenticatedRoute exact path='/admin/image-slider/add' component={AddImageSlider} />

            <AuthenticatedRoute exact path='/admin/call-session' component={CallSession} />
            <AuthenticatedRoute exact path='/admin/call-session/edit/:id' component={EditCallSession} />

            <AuthenticatedRoute exact path='/admin/payment' component={Payment} />
            <AuthenticatedRoute exact path='/admin/payment/edit/:id' component={EditPayment} />

            <AuthenticatedRoute exact path='/admin/notification/send' component={AddNotification} />

            <AuthenticatedRoute exact path='/admin/user' component={User} />
            <AuthenticatedRoute exact path='/admin/user/:id' component={EditUser} />

            <AuthenticatedRoute exact path='/admin/wallet' component={Wallet} />
            <AuthenticatedRoute exact path='/admin/wallet/:id' component={EditWallet} />

        </Switch>
    );
}
