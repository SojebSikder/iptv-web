import React, { useState, useEffect } from "react";
// Material ui
import { makeStyles } from "@material-ui/core/styles";
// End material ui
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import usePageStyles from "../../styles/pageStyle";
import { Link } from "react-router-dom";
import Auth from "../../api/Auth";
import DataUtil from "../../util/Data";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    form: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    input: {
        display: "none",
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

    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState("");

    const getAll = () => {
        Auth.getUsers(
            (res) => {
                setUsers(res.data.data);
                //console.log(res.data.data);
            },
            (err) => {}
        );
    };

    const getUser = () => {
        Auth.getUsersByType(
            "user",
            (res) => {
                setUsers(res.data.data);
            },
            (err) => {}
        );
    };

    const getDoctor = () => {
        Auth.getUsersByType(
            "doctor",
            (res) => {
                setUsers(res.data.data);
            },
            (err) => {}
        );
    };

    // const getDeliveryman = () => {
    //     Auth.getUsers((res) => {
    //         setUsers(res.data.data);
    //     }, (err) => {

    //     });
    // }

    const getAdmin = () => {
        Auth.getUsersByType(
            "admin",
            (res) => {
                setUsers(res.data.data);
            },
            (err) => {}
        );
    };

    const updateUi = () => {
        getAll();
    };

    useEffect(() => {
        updateUi();
    }, []);

    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>All User</h1>

            <h1>{msg}</h1>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={getAll}
            >
                All
            </Button>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={getUser}
            >
                User
            </Button>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={getDoctor}
            >
                Doctor
            </Button>

            {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={getDeliveryman}
            >
                User
            </Button> */}

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={getAdmin}
            >
                Admin
            </Button>

            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SL</TableCell>

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
                        {users.map((user, index) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell>
                                        <Link to={"/admin/user/" + user.id}>
                                            Manage
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {DataUtil.isExist(user.id)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.user_type)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.name)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.email)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.phone)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.is_online)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.image)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.address_id)}
                                    </TableCell>

                                    <TableCell>
                                        {DataUtil.isExist(user.docs_image)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.nid)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.title)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.education)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.bmdc_number)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.company)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.experience)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.fee)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.start_time)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(
                                            user.start_availability
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.payment_method)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.payment_contact)}
                                    </TableCell>

                                    <TableCell>
                                        {DataUtil.isExist(user.status)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.created_at)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(user.updated_at)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
