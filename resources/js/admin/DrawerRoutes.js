import React from "react";
import { Switch } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";

import Home from "./pages/Home";
import AllPost from "./pages/posts/Index";
import AddPost from "./pages/posts/Add";
import EditPost from "./pages/posts/Edit";

import Category from "./pages/category/Index";
import AddCategory from "./pages/category/Add";
import EditCategory from "./pages/category/Edit";

import User from "./pages/user/Index";
import EditUser from "./pages/user/User";

import Settings from "./pages/Settings";

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

            <AuthenticatedRoute exact path="/admin/user" component={User} />
            <AuthenticatedRoute
                exact
                path="/admin/user/:id"
                component={EditUser}
            />

            <AuthenticatedRoute
                exact
                path="/admin/settings"
                component={Settings}
            />
        </Switch>
    );
}
