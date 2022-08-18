import React from "react";
import { Route, Switch } from "react-router";
import Reset from "./pages/password_recovery/Reset";
import Landing from "./pages/landing/Index";
import Update from "./pages/update/Index";
import Error404 from "./components/Error404";


export default function Routes() {
    return (
        <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/forgot-password/:code" component={Reset} />
            <Route exact path="/update" component={Update} />
            <Route exact path="/*" component={Error404} />
        </Switch>
    );
}
