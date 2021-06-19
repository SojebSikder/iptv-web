import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Password from '../../../api/Password';

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
import PasswordApi from '../../../api/Password';
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


export default function Reset(props) {


    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            code: props.match.params.code,
            password: password
        }
        PasswordApi.recover(data, (res) => {
            setMsg(res.data.message+"!");
        }, (err) => {
            setMsg("Something went wrong :(");
        });
    }
    useEffect(() => {


    }, [])


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <h1>{msg}</h1>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Password Recovery
                </Typography>
                <form method="post" onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
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
                        Change Password
                </Button>

                </form>
            </div>
        </Container>
    );
}


