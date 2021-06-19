import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute';
import Dashboard from './components/pages/Dashboard';
import Home from './components/pages/Home';

import AllPost from './components/pages/posts/Index';
import AddPost from './components/pages/posts/Add';
import EditPost from './components/pages/posts/Edit';

import AddNotification from './components/pages/notification/Add';

import Category from './components/pages/category/Index';
import AddCategory from './components/pages/category/Add';
import EditCategory from './components/pages/category/Edit';

import ImageSlider from './components/pages/image_slider/Index';
import AddImageSlider from './components/pages/image_slider/Add';

import User from './components/pages/user/Index';
import EditUser from './components/pages/user/User';

import Error404 from './components/Error404';
import Auth from './api/Auth';

export default function DrawerRoutes() {

    return (
        <Switch>
            <AuthenticatedRoute exact path='/admin' component={Home} />
            <AuthenticatedRoute exact path='/admin/allposts' component={AllPost} />
            <AuthenticatedRoute exact path='/admin/addposts' component={AddPost} />
            <AuthenticatedRoute exact path='/admin/edit/:id' component={EditPost} />

            <AuthenticatedRoute exact path='/admin/category' component={Category} />
            <AuthenticatedRoute exact path='/admin/category/add' component={AddCategory} />
            <AuthenticatedRoute exact path='/admin/category/edit/:id' component={EditCategory} />

            <AuthenticatedRoute exact path='/admin/image-slider' component={ImageSlider} />
            <AuthenticatedRoute exact path='/admin/image-slider/add' component={AddImageSlider} />

            <AuthenticatedRoute exact path='/admin/notification/send' component={AddNotification} />

            <AuthenticatedRoute exact path='/admin/user' component={User} />
            <AuthenticatedRoute exact path='/admin/user/:id' component={EditUser} />


        </Switch>
    );
}
