import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";

import Home from "./pages/Home";
import AllPost from "./pages/posts/Index";
import AddPost from "./pages/posts/Add";
import EditPost from "./pages/posts/Edit";

import AddNotification from "./pages/notification/Add";

import Category from "./pages/category/Index";
import AddCategory from "./pages/category/Add";
import EditCategory from "./pages/category/Edit";

import ImageSlider from "./pages/image_slider/Index";
import AddImageSlider from "./pages/image_slider/Add";

import User from "./pages/user/Index";
import EditUser from "./pages/user/User";

export default function DrawerRoutes() {
    return (
        <Switch>
            <AuthenticatedRoute exact path="/admin" component={Home} />
            <AuthenticatedRoute
                exact
                path="/admin/allposts"
                component={AllPost}
            />
            <AuthenticatedRoute
                exact
                path="/admin/addposts"
                component={AddPost}
            />
            <AuthenticatedRoute
                exact
                path="/admin/edit/:id"
                component={EditPost}
            />

            <AuthenticatedRoute
                exact
                path="/admin/category"
                component={Category}
            />
            <AuthenticatedRoute
                exact
                path="/admin/category/add"
                component={AddCategory}
            />
            <AuthenticatedRoute
                exact
                path="/admin/category/edit/:id"
                component={EditCategory}
            />

            <AuthenticatedRoute
                exact
                path="/admin/image-slider"
                component={ImageSlider}
            />
            <AuthenticatedRoute
                exact
                path="/admin/image-slider/add"
                component={AddImageSlider}
            />

            <AuthenticatedRoute
                exact
                path="/admin/notification/send"
                component={AddNotification}
            />

            <AuthenticatedRoute exact path="/admin/user" component={User} />
            <AuthenticatedRoute
                exact
                path="/admin/user/:id"
                component={EditUser}
            />
        </Switch>
    );
}
