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

                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >

                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            component={Link}
                            to={"/admin/wallet"}
                        >
                            Wallet
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleDoctorCategoryClick}
                        >
                            Doctor Category
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElDoctorCategory}
                            keepMounted
                            open={Boolean(anchorElDoctorCategory)}
                            onClose={handleDoctorCategoryClose}
                        >
                            <MenuItem
                                component={Link}
                                to={"/admin/doctor-category/add"}
                                onClick={handleDoctorCategoryClose}>Add Doctor Category</MenuItem>
                            <MenuItem
                                component={Link}
                                to={"/admin/doctor-category"}
                                onClick={handleDoctorCategoryClose}>All Doctor Category</MenuItem>
                        </Menu>

                    </Grid>

                </Grid>

            </Typography>
        </div>
    )
}
