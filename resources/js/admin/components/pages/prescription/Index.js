import React, { useState, useEffect } from 'react'
// Material ui
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import usePageStyles from '../../../styles/pageStyle';
// End material ui
import PostApi from '../../../api/Post';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';
import Auth from '../../../api/Auth';
import PrescriptionApi from '../../../api/Prescription';
import Config from '../../../classes/Config';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
export default function Index() {
    // hooks
    const classes = usePageStyles();
    const tableStyle = useTableStyles();
    const [msg, setMsg] = useState('');
    const [prescription, setPrescription] = useState([]);
    const [prescriptionStatusList, setPrescriptionStatusList] = useState('');


    const handlePrescriptionStatusList = (event) => {
        setPrescriptionStatusList(event.target.value);
    }

    const updateUi = () => {
        PrescriptionApi.getPrescription((res) => {
            setPrescription(res.data.data);
        }, (error) => {
            setMsg(error);
        });
    }

    const handleUpdateOrder = (id) => {
        const data = {
            admin: "admin",
            status: prescriptionStatusList,
        }
        PrescriptionApi.updatePrescription(id, data, (res) => {
            setMsg('Command Executed');
            updateUi();
        }, (err) => {
            setMsg(err);
        });
        setMsg('');
    }

    useEffect(() => {
        updateUi();
    }, []);

    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />

            <h1>{msg}</h1>
            {/* {console.log(Auth.checkAuth() == true ? "logged" : "not logged")} */}

            <h1>All Prescriptions</h1>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={updateUi}
                startIcon={<RefreshIcon />}
            >
                Refresh
            </Button>

            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SL</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Prescription Image</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Address</TableCell>

                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prescription.length == 0 ? <LoadingBar /> : prescription.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={prescriptionStatusList}
                                            onChange={handlePrescriptionStatusList}
                                            required
                                        >
                                            <MenuItem value="false">
                                                Order Not Completed
                                            </MenuItem>
                                            <MenuItem value="true">
                                                Order Completed
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => handleUpdateOrder(post.id)}
                                    >
                                        Complete
                        </Button></TableCell>

                                <TableCell component="th" scope="row">
                                    {post.status == null ? "" : post.status}
                                </TableCell>
                                <TableCell align="right">{post.address_id == null ? post.users.name : post.address[0].name}</TableCell>
                                <TableCell> <a target="_blank_" href={Config.getBase() + "/uploads/prescriptions/" + post.prescription_image}> <img width='50' height="50" src={Config.getBase() + "/uploads/prescriptions/" + post.prescription_image} alt="" /></a></TableCell>
                                <TableCell>{post.address_id == null ? "" : post.address[0].phone + ", " + post.address[0].email}</TableCell>
                                <TableCell align="right">{post.address_id == null ? "" : post.address[0].house + ", " + post.address[0].city + ", " + post.address[0].address}</TableCell>

                                <TableCell>{post.created_at}</TableCell>
                                <TableCell>{post.updated_at}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
