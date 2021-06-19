import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DialpadIcon from '@material-ui/icons/Dialpad';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PaymentIcon from '@material-ui/icons/Payment';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import CategoryIcon from '@material-ui/icons/Category';
// End material ui
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElCategory, setAnchorElCategory] = React.useState(null);
  const [anchorElImageSlider, setAnchorElImageSlider] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleClickCategory = (event) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleCloseCategory = () => {
    setAnchorElCategory(null);
  };

  const handleClickImageSlider = (event) => {
    setAnchorElImageSlider(event.currentTarget);
  };
  const handleCloseImageSlider = () => {
    setAnchorElImageSlider(null);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HealthCity Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>

          <ListItem button component={Link} to={"/admin"}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>

          <ListItem aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} button >
            <ListItemIcon><DialpadIcon /></ListItemIcon>
            <ListItemText primary={"Product"} />
          </ListItem>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={"/admin/addposts"} onClick={handleClose}>Add New Products</MenuItem>
            <MenuItem component={Link} to={"/admin/allposts"} onClick={handleClose}>All Products</MenuItem>
          </Menu>

          <ListItem button component={Link} to={"/admin/order"}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/prescription"}>
            <ListItemIcon><VisibilityIcon /></ListItemIcon>
            <ListItemText primary={"Prescriptions"} />
          </ListItem>

          <ListItem aria-controls="category-menu" aria-haspopup="true" onClick={handleClickCategory} button >
            <ListItemIcon><CategoryIcon /></ListItemIcon>
            <ListItemText primary={"Category"} />
          </ListItem>

          <Menu
            id="category-menu"
            anchorEl={anchorElCategory}
            keepMounted
            open={Boolean(anchorElCategory)}
            onClose={handleCloseCategory}
          >
            <MenuItem component={Link} to={"/admin/category/add"} onClick={handleCloseCategory}>Add New Category</MenuItem>
            <MenuItem component={Link} to={"/admin/category/"} onClick={handleCloseCategory}>All Category</MenuItem>
          </Menu>


          <ListItem aria-controls="imageSlider-menu" aria-haspopup="true" onClick={handleClickImageSlider} button >
            <ListItemIcon><BurstModeIcon /></ListItemIcon>
            <ListItemText primary={"Image Slider"} />
          </ListItem>

          <Menu
            id="imageSlider-menu"
            anchorEl={anchorElImageSlider}
            keepMounted
            open={Boolean(anchorElImageSlider)}
            onClose={handleCloseImageSlider}
          >
            <MenuItem component={Link} to={"/admin/image-slider/add"} onClick={handleCloseImageSlider}>Add Image Slider Image</MenuItem>
            <MenuItem component={Link} to={"/admin/image-slider"} onClick={handleCloseImageSlider}>All Image Slider Image</MenuItem>
          </Menu>


          <ListItem button component={Link} to={"/admin/call-session"}>
            <ListItemIcon><VideoCallIcon /></ListItemIcon>
            <ListItemText primary={"Call Session"} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/payment"}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary={"Payments"} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/notification/send"}>
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary={"Send Notification"} />
          </ListItem>

          <ListItem button component={Link} to={"/admin/user"}>
            <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
            <ListItemText primary={"All User"} />
          </ListItem>


        </List>
        <Divider />
        <ListItem button component={Link} to={"/admin/settings"}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>

      </Drawer>

    </div>
  );
}
