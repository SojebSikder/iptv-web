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
import WalletApi from '../../../api/Wallet';


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
        WalletApi.deleteWalletById(id, (res) => {
            setMsg('Deleted Payment Successfully');
            updateUi();
        }, (err) => {
            setMsg(err);
        });

        setMsg('');
    }

    const updateUi = () => {

        WalletApi.getWallets((res) => {
            setCategories(res.data.data);
        }, (err) => {

        });
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />

            <h1>All Wallets</h1>

            {msg}

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
                            <TableCell>Wallet ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Balance</TableCell>
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
                                    </Button> | */}

                                    <Link to={"/admin/wallet/" + post.user_id}>Edit</Link>
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {post.id}

                                </TableCell>

                                <TableCell>
                                    <Link to={"/admin/user/" + post.user_id}>{post.user_id == null ? "" : post.user_id}</Link>

                                </TableCell>

                                <TableCell>{post.balance == null ? "" : post.balance}</TableCell>


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
