import React, { useState, useEffect } from 'react'
// Material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// End material ui
import usePageStyles from '../../../styles/pageStyle';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import PaymentApi from '../../../api/Payment';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Index() {
    const classes = usePageStyles();
    const tableStyle = useTableStyles();

    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');

    const deleteById = (id) => {
        var bool = confirm('Are you sure to delete (this cannot be undone)');

        if (bool) {

            PaymentApi.deletePaymentById(id, (res) => {
                setMsg('Deleted Payment Successfully');
                updateUi();
            }, (err) => {
                setMsg(err);
            });

            setMsg('');
        }
    }

    const updateUi = () => {
        PaymentApi.getPayments((res) => {
            setCategories(res.data.data);
            setMsg("");
        }, (err) => {
            setMsg("Something wrong :(");
        });
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />

            <h1>All Payments</h1>

            <h1>{msg}</h1>

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
                            <TableCell>Action</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Wallet ID</TableCell>
                            <TableCell>Pay To</TableCell>
                            <TableCell>Payment Type</TableCell>
                            <TableCell>Amount</TableCell>

                            <TableCell>Number</TableCell>
                            <TableCell>Trx ID</TableCell>
                            <TableCell>Verify</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length == 0 ? <LoadingBar /> : categories.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => deleteById(post.id)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>| */}

                                    <Link to={"/admin/payment/edit/" + post.id}>Edit</Link> </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link to={"/admin/user/" + post.user_id}>{post.user_id == null ? "" : post.user_id}</Link>

                                </TableCell>

                                <TableCell>
                                    <Link to={"/admin/wallet/" + post.pay_to}>{post.wallet_id == null ? "" : post.wallet_id}</Link>
                                </TableCell>

                                <TableCell>
                                    <Link to={"/admin/user/" + post.pay_to}>{post.pay_to == null ? "" : post.pay_to}</Link>
                                </TableCell>
                                <TableCell>{post.payment_type == null ? "" : post.payment_type}</TableCell>
                                <TableCell>{post.amount == null ? "" : post.amount}</TableCell>

                                <TableCell>{post.number == null ? "" : post.number}</TableCell>
                                <TableCell>{post.trx_id == null ? "" : post.trx_id}</TableCell>
                                <TableCell>{post.verify == null ? "" : post.verify}</TableCell>

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
