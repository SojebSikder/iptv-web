import React, { useState } from 'react'
import { Link } from "react-router-dom";
// Material ui
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// End material ui
import usePageStyles from '../../styles/pageStyle';


export default function Home() {
    const classes = usePageStyles();

    // For element
    const [anchorElDoctorCategory, setAnchorElDoctorCategory] = useState(null);

    const handleDoctorCategoryClick = (event) => {
        setAnchorElDoctorCategory(event.currentTarget);
    };

    const handleDoctorCategoryClose = () => {
        setAnchorElDoctorCategory(null);
    };
    // End Element

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
                Home
            </Typography>
        </div>
    )
}
