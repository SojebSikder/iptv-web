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

import { Link } from 'react-router-dom';
import DataUtil from '../../../util/Data';
import Auth from '../../../api/Auth';

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

export default function User(props) {
    const classes = useStyles();
    const classesEx = usePageStyles();
    const tableStyle = useTableStyles();

    const [user, setUser] = useState([]);
    const [status, setStatus] = useState('');
    const [role, setRole] = useState('');
    const [msg, setMsg] = useState('');


    const handleUpdate = () => {
        const data = new FormData();
        data.append('id', props.match.params.id);
        data.append('userType', 'admin');
        data.append('user_type', role);
        data.append('status', status);
        //data.append('_method', 'PATCH');

        Auth.updateUser(data, (res) => {
            setMsg('User Updated');

            updateUi();
        }, (err) => {
            setMsg(err);
        });

        setMsg('');
    }

    const getUserById = () => {
        Auth.getUserById(props.match.params.id, (res) => {
            setUser(res.data.data);
            setStatus(res.data.data.status);
            setRole(res.data.data.user_type);
            //console.log(res.data.data);
        }, (err) => {

        });
    }

    // for status element
    const handleStatusList = (event) => {
        setStatus(event.target.value);
    };
    // for role element
    const handleRoleList = (event) => {
        setRole(event.target.value);
    };

    const updateUi = () => {
        getUserById();
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>User Information</h1>

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

                    <MenuItem value="allow">
                        Allow
                        </MenuItem>
                    <MenuItem value="deny">
                        Deny
                        </MenuItem>

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleRoleList}
                    required
                >

                    <MenuItem value="user">
                        User
                        </MenuItem>
                    <MenuItem value="doctor">
                        Doctor
                        </MenuItem>
                    {/* <MenuItem value="deliveryman">
                        Deliveryman
                        </MenuItem> */}
                    <MenuItem value="admin">
                        Admin
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

                            <TableCell>Action</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>User Type</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Is_Online</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Address</TableCell>

                            <TableCell>Docs_image</TableCell>
                            <TableCell>NID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Education</TableCell>
                            <TableCell>BMDC Number</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>Fee</TableCell>
                            <TableCell>Time Availablability</TableCell>
                            <TableCell>Date Availablability</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Payment Contact</TableCell>


                            <TableCell>Status</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>



                        <TableRow>

                            <TableCell>
                                <Link to={"/admin/wallet/" + user.id}>Manage Wallet</Link>
                            </TableCell>

                            <TableCell>{DataUtil.isExist(user.id)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.user_type)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.name)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.email)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.phone)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.is_online)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.image)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.address_id)}</TableCell>

                            <TableCell>{DataUtil.isExist(user.docs_image)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.nid)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.title)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.education)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.bmdc_number)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.company)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.experience)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.fee)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.start_time)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.start_availability)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.payment_method)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.payment_contact)}</TableCell>


                            <TableCell>{DataUtil.isExist(user.status)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.created_at)}</TableCell>
                            <TableCell>{DataUtil.isExist(user.updated_at)}</TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
