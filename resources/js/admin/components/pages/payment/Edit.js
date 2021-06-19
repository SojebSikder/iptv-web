import React, { useState, useEffect } from 'react'
// Material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// End material ui
import usePageStyles from '../../../styles/pageStyle';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CategoryApi from '../../../api/category';
import Config from '../../../classes/Config';
import { Link } from 'react-router-dom';
import CallSessionApi from '../../../api/CallSession';
import PaymentApi from '../../../api/Payment';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Edit(props) {
    const classes = useStyles();
    const classesEx = usePageStyles();
    const tableStyle = useTableStyles();

    const [post, setPost] = useState([]);
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');


    const handleUpdate = () => {
        const data = new FormData();
        data.append('status', status);
        data.append('_method', 'PATCH');

        PaymentApi.updatePayment(props.match.params.id, data, (res) => {
            setMsg('Payment Updated');
            updateUi();
        }, (err) => {
            setMsg(err);
        });

    }

    // for status element
    const handleStatusList = (event) => {
        setStatus(event.target.value);
    };

    const updateUi = () => {
        PaymentApi.getPaymentyById(props.match.params.id, (res) => {
            setPost(res.data.data);
            setStatus(res.data.data.verify);
        }, (err) => {
            setMsg("Something went wrong :(");
        });

        // CallSessionApi.getCallSessionById(props.match.params.id, (res) => {
        //     setPost(res.data.data);
        //     setStatus(res.data.data.status);
        //     //console.log(res.data.data);
        // }, (err) => {
        //     setMsg("Something went wrong :(");
        // });
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>Manage Payment</h1>

            <h1>{msg}</h1>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={handleStatusList}
                    required
                >

                    <MenuItem value="verified">
                        Verified
                        </MenuItem>
                    <MenuItem value="not_verified">
                        Not Verified
                        </MenuItem>

                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
            >
                Execute
            </Button>

            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Trx ID</TableCell>
                            <TableCell>Verify</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>

                            <TableCell component="th" scope="row">
                                {post.user_id == null ? "" : post.user_id}
                            </TableCell>
                            <TableCell>{post.number == null ? "" : post.number}</TableCell>
                            <TableCell>{post.trx_id == null ? "" : post.trx_id}</TableCell>

                            <TableCell>{post.verify == null ? "" : post.verify}</TableCell>

                            <TableCell>{post.created_at}</TableCell>
                            <TableCell>{post.updated_at}</TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
