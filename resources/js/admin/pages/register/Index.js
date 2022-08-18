import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Auth from '../../api/Auth';
import AlertMsg from '../../components/AlertMsg';
import Copyright from '../../components/Copyright';
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


export default function Index(props) {

    // User information
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Error handling variable
    const [alert_message, setAlert_message] = useState('');

    const classes = useStyles();



    // Get value from input and set state
    const onChangeName = (e) => {
        setName(e.target.value);
    }
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
            name: name,
            email: email,
            password: password
        }

        Auth.register(user, (res) => {
            if (res.data.success == true) {
                if (res.data.user.user_type == "admin") {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userType", res.data.user.user_type);
                    setAlert_message('success');
                    UrlHelper.redirectTo(props, '/admin');
                } else {
                    setAlert_message('You are not admin :( Please step aside.');
                }
            } else {
                setAlert_message('error');
                //SessionService.removeAll();
                localStorage.clear();
            }
        }, (err) => {
            setAlert_message('Something wrong');
        });


    }



    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <h1>{alert_message}</h1>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={onChangeName}
                    />
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
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/admin/login" variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Copyright />
        </Container>
    );
}


