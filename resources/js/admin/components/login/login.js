import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Auth from '../../api/Auth';
import AlertMsg from './../AlertMsg';
import Copyright from './../Copyright';
import UrlHelper from '../../helpers/UrlHelper';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SessionService from '../../services/SessionService';
// End Material UI




// Style
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Login(props) {

    // User information
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error handling variable
    const [alert_message, setAlert_message] = useState('');

    const classes = useStyles();



    // Get value from input and set state
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    // create user account
    const onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password
        }

        Auth.login(user, (res) => {
            if (res.data.success == true) {
                if (res.data.user.user_type == "admin") {
                    localStorage.setItem("token", res.data.token);
                    //localStorage.setItem("user", "Hello World");
                    localStorage.setItem("userType", res.data.user.user_type);
                    //localStorage.setItem("user", JSON.stringify(res.data.user));
                    //console.log(localStorage.getItem("token"));

                    // retreve var user = JSON.parse(localStorage.getItem('user'));
                    // for (var i in res.data.user) {
                    //     localStorage.setItem("user." + i, res.data.user[i]);
                    //     //SessionService.set("user." + i, res.data.user[i]);
                    // }
                    setAlert_message('success');
                    UrlHelper.redirectTo(props, '/admin');
                    //return props.history.push('/admin');
                } else {
                    setAlert_message('You are not admin :( Please step aside.');
                }
            } else {
                setAlert_message('error');
                //SessionService.removeAll();
                localStorage.clear();
            }
        }, (err) => {
            setAlert_message('Somethinh wrong');
        });


    }



    // useEffect(() => {

    //     // check if user logged in or not
    //     // if (AuthService.isLogged() == true) {
    //     //     UrlHelper.redirectTo(props, '/admin');
    //     //     //return <Redirect to='/profile' />;
    //     // }

    //     Auth.checkAuth((res) => {
    //         if (res.data.message == true) {
    //             console.log("data: "+res.data.message);
    //             UrlHelper.redirectTo(props, '/admin');
    //         } else {
    //             UrlHelper.redirectTo(props, '/admin/login');
    //         }
    //     }, (err) => {
    //         UrlHelper.redirectTo(props, '/admin/login');
    //     });

    // }, []);


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <h1>{alert_message}</h1>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChangeEmail}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChangePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                    </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Copyright />
        </Container>
    );
}


