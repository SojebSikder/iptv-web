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
import SaveIcon from '@material-ui/icons/Save';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';

import PaymentApi from '../../../api/Payment';
import WalletApi from '../../../api/Wallet';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Edit(props) {
    const classes = usePageStyles();
    const tableStyle = useTableStyles();

    const [balance, setBalance] = useState("");
    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');


    const handleBalance = (e) => {
        setBalance(e.target.value);
    }
    const handleUpdate = () => {
        const data = {
            balance: balance,
            userType: "admin",
            _method: 'PATCH',
        };
        WalletApi.updateWallet(props.match.params.id, data, (res) => {

            // Add transection track
            const data = {
                wallet_id: categories.id,
                pay_to: categories.user_id,
                payment_type: "payout",
                amount: balance,
                verify: "verified",
            };
            PaymentApi.addPayment(data, (res) => {
                setMsg("Executed successfully!");
            }, (err) => {
                setMsg("Something wrong :(");
            });
            // End Add transection track
            updateUi();
        }, (err) => {
            setMsg("Something wrong :(");
        });
        setMsg("");
    }


    const updateUi = () => {

        WalletApi.getWalletById(props.match.params.id, (res) => {
            setCategories(res.data.data);
        }, (err) => {
            setMsg("Something wrong :(");
        });
        setMsg("");
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />

            <h1>Manage Wallet</h1>

            <h1>{msg}</h1>

            <TextField
                id="outlined-basic"
                label="Balance"
                variant="outlined"
                name="balance"
                value={balance}
                onChange={handleBalance}
            />


            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
            >
                Execute
            </Button>

            <br />



            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Wallet ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow key={categories.id}>

                            <TableCell component="th" scope="row">
                                {categories.id}

                            </TableCell>

                            <TableCell>
                                <Link to={"/admin/user/" + categories.user_id}>{categories.user_id == null ? "" : categories.user_id}</Link>

                            </TableCell>

                            <TableCell>{categories.balance == null ? "" : categories.balance}</TableCell>


                            <TableCell>{categories.created_at}</TableCell>
                            <TableCell>{categories.updated_at}</TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
