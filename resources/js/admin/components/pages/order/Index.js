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
import { Button, Divider, makeStyles } from '@material-ui/core';
import usePageStyles from '../../../styles/pageStyle';
import RefreshIcon from '@material-ui/icons/Refresh';
// End material ui
import OrderApi from '../../../api/Order';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';
import Auth from '../../../api/Auth';
import AddressApi from '../../../api/Address';
import DataUtil from '../../../util/Data';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
export default function Index() {
    // hooks
    const classes = usePageStyles();
    const tableStyle = useTableStyles();
    const [orders, setOrders] = useState([]);

    const updateUi = () => {
        OrderApi.getOrder((res) => {
            setOrders(res.data.data);
        }, (error) => {
            // console.log(error);
        });
    }

    useEffect(() => {

        updateUi();

    }, []);



    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />


            <h1>All Orders</h1>
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
                            <TableCell>Status</TableCell>
                            <TableCell>Order Id</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Payment Mode</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Delivery Time</TableCell>
                            <TableCell>Delivery Completed</TableCell>

                            <TableCell>Comment</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length == 0 ? <LoadingBar /> : orders.map((post) => {
                            if (post.status != "order_delivered") {
                                var address = post.address_id == null ? "" : "name: " + DataUtil.isExist(post.address.name) + "\naddress: [" + DataUtil.isExist(post.address.city) + ", " + DataUtil.isExist(post.address.address) + "]";
                                return (
                                    <TableRow key={post.id}>
                                        <TableCell><Link to={"/admin/order/manage/" + post.order_id}>Manage</Link> </TableCell>
                                        <TableCell>{post.status == null ? "" : post.status}</TableCell>
                                        <TableCell>
                                            {post.order_id == null ? "" : post.order_id}
                                        </TableCell>
                                        <TableCell align="right">


                                            <Link
                                                to={"/admin/user/" + post.user_id}
                                            >
                                                {post.user_id == null ? "" : post.user_id}
                                            </Link>



                                            {/* {post.user_id == null ? "" : post.user_id} */}
                                        </TableCell>

                                        <TableCell>{post.price == null ? "" : post.price}</TableCell>
                                        <TableCell>{post.payment_mode == null ? "" : post.payment_mode}</TableCell>
                                        <TableCell>{post.payment_status == null ? "" : post.payment_status}</TableCell>
                                        <TableCell>{post.delivery_time == null ? "" : post.delivery_time}</TableCell>
                                        <TableCell>{post.delivery_completed == null ? "" : post.delivery_completed}</TableCell>

                                        <TableCell>{post.comment == null ? "" : post.comment}</TableCell>
                                        <TableCell>{post.address_id == null ? "" : address}</TableCell>
                                        <TableCell>{post.created_at == null ? "" : post.created_at}</TableCell>
                                        <TableCell>{post.updated_at == null ? "" : post.updated_at}</TableCell>

                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider />

            <h1>Orders Completed</h1>

            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Order Id</TableCell>
                            <TableCell>User Id</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Payment Mode</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Delivery Time</TableCell>
                            <TableCell>Delivery Completed</TableCell>

                            <TableCell>Comment</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length == 0 ? <LoadingBar /> : orders.map((post) => {
                            if (post.status == "order_delivered") {
                                var address = post.address_id == null ? "" : "name: " + DataUtil.isExist(post.address.name) + "\naddress: [" + DataUtil.isExist(post.address.city) + ", " + DataUtil.isExist(post.address.address) + "]";
                                return (
                                    <TableRow key={post.id}>
                                        <TableCell><Link to={"/admin/order/manage/" + post.order_id}>Manage</Link> </TableCell>
                                        <TableCell>{post.status == null ? "" : post.status}</TableCell>
                                        <TableCell>
                                            {post.order_id == null ? "" : post.order_id}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link
                                                to={"/admin/user/" + post.user_id}
                                            >
                                                {post.user_id == null ? "" : post.user_id}
                                            </Link>

                                            {/* {post.user_id == null ? "" : post.user_id} */}

                                        </TableCell>
                                        <TableCell>{post.price == null ? "" : post.price}</TableCell>
                                        <TableCell>{post.payment_mode == null ? "" : post.payment_mode}</TableCell>
                                        <TableCell>{post.payment_status == null ? "" : post.payment_status}</TableCell>
                                        <TableCell>{post.delivery_time == null ? "" : post.delivery_time}</TableCell>
                                        <TableCell>{post.delivery_completed == null ? "" : post.delivery_completed}</TableCell>

                                        <TableCell>{post.comment == null ? "" : post.comment}</TableCell>
                                        <TableCell>{post.address_id == null ? "" : address}</TableCell>
                                        <TableCell>{post.created_at == null ? "" : post.created_at}</TableCell>
                                        <TableCell>{post.updated_at == null ? "" : post.updated_at}</TableCell>

                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
