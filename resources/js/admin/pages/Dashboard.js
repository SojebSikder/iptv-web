import React from "react";

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline";
// End material ui
import Sidebar from "../components/partials/Sidebar";
import DrawerRoutes from "../DrawerRoutes";
import usePageStyles from "../styles/pageStyle";

export default function Dashboard() {
    const classes = usePageStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Sidebar />
            <DrawerRoutes />
        </div>
    );
}
