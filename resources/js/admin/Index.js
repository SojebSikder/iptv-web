import React, { useEffect } from 'react'
import Header from './components/partials/Header';
import Routes from './Routes';

// Material ui
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import Auth from './api/Auth';
import UrlHelper from './helpers/UrlHelper';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: orange[500],
        }
    }
});

export default function Index(props) {
    useEffect(() => {
        Auth.checkAuth((res) => {
            //console.log("data: " + res.data.state);
            if (res.data.state == 0) {
                UrlHelper.fallback(props);
            }
        }, (err) => {
            if (err == "Error: Request failed with status code 401") {
                UrlHelper.fallback(props);
            }
        });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            {/* <Header /> */}
            <Routes />
        </ThemeProvider>
    )
}
