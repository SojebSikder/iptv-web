import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../api/Auth";
import Userinfo from "../../config/Userinfo";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button } from "@material-ui/core";
import useNavBarStyles from "../../styles/navbarStyle";
// End Material UI

export default function Navbar() {
    const classes = useNavBarStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {Auth.checkAuth() == true ? (
                <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/admin/profile"
                >
                    Profile
                </MenuItem>
            ) : null}
            {Auth.checkAuth() == true ? (
                <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/admin/settings"
                >
                    Settings
                </MenuItem>
            ) : null}

            {Auth.checkAuth() == true ? null : (
                <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/admin/login"
                >
                    Login
                </MenuItem>
            )}
            {Auth.checkAuth() == true ? null : (
                <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/admin/register"
                >
                    Register
                </MenuItem>
            )}
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link color="inherit" to="/">
                    Home
                </Link>
            </MenuItem>

            <MenuItem onClick={handleProfileMenuOpen}>
                {Auth.checkAuth() == true ? Userinfo.getName() : <p>Account</p>}
            </MenuItem>

            <MenuItem>
                <Link color="inherit" to="/about">
                    About us
                </Link>
            </MenuItem>

            <MenuItem>
                <Link color="inherit" to="/contact">
                    Contact us
                </Link>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography className={classes.title} variant="h6" noWrap>
                        Sojeb's Blog
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>

                        {Auth.checkAuth() == true ? (
                            <Button
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {Userinfo.getName()}
                            </Button>
                        ) : (
                            <Button
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                Account
                            </Button>
                        )}

                        <Button color="inherit" component={Link} to="/about">
                            About us
                        </Button>
                        <Button color="inherit" component={Link} to="/contact">
                            Contact us
                        </Button>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
