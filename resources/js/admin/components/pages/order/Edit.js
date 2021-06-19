import React, { useState, useEffect } from 'react'
import Config from '../../../classes/Config';
import AlertMsg from '../../AlertMsg';
import UrlHelper from '../../../helpers/UrlHelper';
// Material ui
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import usePageStyles from '../../../styles/pageStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CategoryApi from '../../../api/category';
import PostApi from '../../../api/Post';
import OrderApi from '../../../api/Order';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';
// End material ui

const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
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

export default function Edit(props) {
    // style hook
    const exClasses = usePageStyles();
    const classes = useStyles();
    const tableStyle = useTableStyles();
    // end style hook
    const [msg, setMsg] = useState();
    const [order, setOrder] = useState([]);
    const [orderProduct, setOrderProduct] = useState([]);
    // for element
    const [orderStatusList, setOrderStatusList] = useState('');
    const [paymentStatusList, setPaymentStatusList] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [addressInfo, setAddressInfo] = useState('');

    // Handle Update Order
    const handleUpdateOrder = () => {
        const data = {
            admin: "admin",
            order_status: orderStatusList,
            payment_status: paymentStatusList,
            delivery_time: deliveryTime,
        }
        OrderApi.updateOrderById(props.match.params.id, data, (res) => {

            setMsg("#Command Executed");
            updateUi();
        }, (err) => {
            setMsg(err);
        });


        setMsg('');

    }


    // for order status element
    const handleOrderStatusList = (event) => {
        setOrderStatusList(event.target.value);
    };
    // for paymenr status list
    const handlePaymentStatusList = (event) => {
        setPaymentStatusList(event.target.value);
    };
    const handleDeliveryTime = (event) => {
        setDeliveryTime(event.target.value);
    }

    // update ui
    const updateUi = () => {
        // load data
        OrderApi.getOrderById(props.match.params.id, (res) => {
            //console.log(res.data.data[0].order_id);
            setOrder(res.data.data[0]);
            setOrderProduct(res.data.data_product);
            //
            //
            // set order status
            setOrderStatusList(res.data.data[0].status);
            //set payment status
            setPaymentStatusList(res.data.data[0].payment_status);
            //set delivery time value
            setDeliveryTime(res.data.data[0].delivery_time);
            var address = "name: " + res.data.data[0].address[0].name + "\naddress: [" + res.data.data[0].address[0].city + ", " + res.data.data[0].address[0].address + "]";
            setAddressInfo(address);
        }, (err) => {

        });
    }

    useEffect(() => {
        updateUi();
    }, [])


    // end element hook method
    return (
        <div className={exClasses.content}>
            <div className={exClasses.toolbar} />
            <h1>Manage Order</h1>
            <form method="post" autoComplete="off">

                <h1>{msg}</h1>

                <h1>Order Action</h1>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={orderStatusList}
                        onChange={handleOrderStatusList}
                        required
                    >

                        <MenuItem value="order_placed">
                            Order Placed
                        </MenuItem>
                        <MenuItem value="order_picked">
                            Order Picked
                        </MenuItem>
                        <MenuItem value="order_on_way">
                            Order On Way
                        </MenuItem>
                        <MenuItem value="order_delivered">
                            Order Delivered
                        </MenuItem>
                        <MenuItem value="order_cancelled">
                            Order Cancelled
                        </MenuItem>
                        <MenuItem value="order_paused">
                            Order Paused
                        </MenuItem>

                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paymentStatusList}
                        onChange={handlePaymentStatusList}
                        required
                    >
                        <MenuItem value="not paid">
                            Not Paid
                        </MenuItem>
                        <MenuItem value="paid">
                            Paid
                        </MenuItem>

                    </Select>
                </FormControl>

                <TextField
                    id="outlined-basic"
                    label="Delivery Time"
                    variant="outlined"
                    name="deliveryTime"
                    value={deliveryTime}
                    onChange={handleDeliveryTime}
                />
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleUpdateOrder}
                        startIcon={<SaveIcon />}
                    >
                        Execute
                </Button>
                </Grid>

                <h1>Order Info</h1>
                <TableContainer component={Paper}>
                    <Table className={tableStyle.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Order Id</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Paymnet Mode</TableCell>
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

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>{order.status == null ? "" : order.status}</TableCell>
                                <TableCell>
                                    {order.order_id == null ? "" : order.order_id}
                                </TableCell>
                                <TableCell align="right">

                                    <Link
                                        to={"/admin/user/" + order.user_id}
                                    >
                                        {order.user_id == null ? "" : order.user_id}
                                    </Link>

                                    {/* {order.user_id == null ? "" : order.user_id} */}

                                </TableCell>
                                <TableCell>{order.price == null ? "" : order.price}</TableCell>
                                <TableCell>{order.payment_mode == null ? "" : order.payment_mode}</TableCell>
                                <TableCell>{order.payment_status == null ? "" : order.payment_status}</TableCell>
                                <TableCell>{order.delivery_time == null ? "" : order.delivery_time}</TableCell>
                                <TableCell>{order.delivery_completed == null ? "" : order.delivery_completed}</TableCell>

                                <TableCell>{order.comment == null ? "" : order.comment}</TableCell>
                                <TableCell>{order.address_id == null ? "" : addressInfo}</TableCell>
                                <TableCell>{order.created_at == null ? "" : order.created_at}</TableCell>
                                <TableCell>{order.updated_at == null ? "" : order.updated_at}</TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <h1>Order Products</h1>

                <TableContainer component={Paper}>
                    <Table className={tableStyle.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                <TableCell>Product Id</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity Type</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderProduct.length == 0 ? <LoadingBar /> : orderProduct.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {post.product_id == null ? "" : post.product_id}
                                    </TableCell>
                                    <TableCell>
                                        {post.posts.title == null ? "" : post.posts.title}
                                    </TableCell>
                                    <TableCell>
                                        {post.price == null ? "" : post.price}
                                    </TableCell>
                                    <TableCell>
                                        {post.qnty_type == null ? "" : post.qnty_type}
                                    </TableCell>
                                    <TableCell>
                                        {post.qnty == null ? "" : post.qnty}
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>




            </form>

        </div>
    )
}
