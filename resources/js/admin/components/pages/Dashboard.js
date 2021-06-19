import React, { useState, useEffect } from 'react';

// Material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// End material ui
import Sidebar from '../partials/Sidebar';
import PostApi from '../../api/Post';
import Config from '../../classes/Config';
import DrawerRoutes from '../../DrawerRoutes';

import usePageStyles from '../../styles/pageStyle';


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
