import React, { useEffect } from "react";
import Auth from "../api/Auth";
import UrlHelper from "../helpers/UrlHelper";
// Material ui
import { Button, Container, CssBaseline } from "@material-ui/core";
// End Material ui
import SessionService from "../services/SessionService";

export default function Settings(props) {
    const onClickLogout = () => {
        Auth.logout(
            (res) => {
                SessionService.removeAll();
                UrlHelper.redirectTo(props, "/admin/login");
            },
            (error) => {}
        );
    };

    useEffect(() => {
        // check if user logged in or not
        // if (AuthService.isLogged() == false){
        //     UrlHelper.redirectTo(props, '/admin/login');
        // }
        // if (Auth.checkAuth()) {
        //     //props.history.push("/admin");
        //     UrlHelper.redirectTo(props, '/admin');
        //     //return <Redirect to='/profile' />;
        // }
    }, []);

    return (
        <Container>
            <br />
            <CssBaseline />
            <h2>Settings pages</h2>
            <hr />
            <Button variant="contained" color="primary" onClick={onClickLogout}>
                Logout
            </Button>
        </Container>
    );
}
