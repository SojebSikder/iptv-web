import React, { useState, useEffect } from 'react'
// Material ui
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import usePageStyles from '../../../styles/pageStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CategoryApi from '../../../api/category';
import PostApi from '../../../api/Post';
// End material ui


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

export default function Add() {
    // style hook
    const exClasses = usePageStyles();
    const classes = useStyles();
    // end style hook

    const [categories, setCategories] = useState([]);

    // Methods for handling add post
    const handleAddPost = () => {
        const data = new FormData();

        data.append('title', textInput.productName);
        data.append('content', textInput.productDetails);
        data.append('brand_name', textInput.brandName);
        data.append('price', textInput.price);
        data.append('qnty_pc_type', checkbox.qntyPcType.toString());
        data.append('qnty_strip_type', checkbox.qntyStripType.toString());
        data.append('qnty_box_type', checkbox.qntyBoxType.toString());
        data.append('qnty', textInput.qnty);
        data.append('strip_qnty', textInput.stripQnty);
        data.append('box_qnty', textInput.boxQnty);
        data.append('image', image, image.name);
        data.append('published', checkbox.publish == true ? 1 : 0);
        data.append('category_id', productCategory);
        // const data = {
        //     title: textInput.productName,
        //     content: textInput.productDetails,
        //     brand_name: textInput.brandName,
        //     price: textInput.price,
        //     qnty_pc_type: checkbox.qntyPcType,
        //     qnty_strip_type: checkbox.qntyStripType,
        //     qnty_box_type: checkbox.qntyBoxType,
        //     qnty: textInput.qnty,
        //     strip_qnty: textInput.stripQnty,
        //     box_qnty: textInput.boxQnty,
        //     Image: image,
        //     published: checkbox.publish,
        //     category_id: productCategory,
        // }
        PostApi.addPosts(data, (res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });


    }

    useEffect(() => {
        CategoryApi.getCategories((res) => {
            setCategories(res.data.data);
        }, (err) => {

        });
    }, [])


    // element hook
    const [image, setImage] = useState('');
    const onFileChange = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };


    const [productCategory, setProductCategory] = useState('');

    const [textInput, setTextInput] = useState({
        productName: '',
        productDetails: '',
        brandName: '',
        price: 0,
        qnty: 0,
        stripQnty: 10,
        boxQnty: 2,
    });

    const [checkbox, setCheckbox] = useState({
        qntyPcType: 'true',
        qntyStripType: 'true',
        qntyBoxType: 'true',
        publish: true,
    });
    // end element hook
    // element hook method
    // for text input
    const handleTextInput = (event) => {
        setTextInput({ ...textInput, [event.target.name]: event.target.value });
    };
    // for dropdown category
    const handleProductCategory = (event) => {
        setProductCategory(event.target.value);
    };
    // for checkbox
    const handleCheckbox = (event) => {
        setCheckbox({ ...checkbox, [event.target.name]: event.target.checked });
    };
    // end element hook method
    return (
        <div className={exClasses.content}>
            <div className={exClasses.toolbar} />

            <h1>Add New Product</h1>

            <form autoComplete="off">

                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >

                    <TextField
                        id="outlined-basic"
                        label="Product Name"
                        variant="outlined"
                        required
                        name="productName"
                        value={textInput.productName}
                        onChange={handleTextInput}
                    />
                    <br />

                    <TextField
                        id="outlined-basic"
                        label="Product Details"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="productDetails"
                        value={textInput.productDetails}
                        onChange={handleTextInput}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Brand Name"
                        variant="outlined"
                        name="brandName"
                        value={textInput.brandName}
                        onChange={handleTextInput}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        required
                        name="price"
                        value={textInput.price}
                        onChange={handleTextInput}
                    />
                    <br />
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkbox.qntyPcType}
                                    onChange={handleCheckbox}
                                    name="qntyPcType"
                                    color="primary"
                                />

                            }
                            label="Quantity Pc Type"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkbox.qntyStripType}
                                    onChange={handleCheckbox}
                                    name="qntyStripType"
                                    color="primary"
                                />

                            }
                            label="Quantity Strip Type"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkbox.qntyBoxType}
                                    onChange={handleCheckbox}
                                    name="qntyBoxype"
                                    color="primary"
                                />

                            }
                            label="Quantity Box Type"
                        />


                    </Grid>
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        required
                        name="qnty"
                        value={textInput.qnty}
                        onChange={handleTextInput}
                    />
                    <br />
                    <Grid
                    >
                        <TextField
                            id="outlined-basic"
                            label="Strip Quantity"
                            variant="outlined"
                            name="stripQnty"
                            value={textInput.stripQnty}
                            onChange={handleTextInput}
                        />
                        <br />
                        <TextField
                            id="outlined-basic"
                            label="Box Quantity"
                            variant="outlined"
                            name="boxQnty"
                            value={textInput.boxQnty}
                            onChange={handleTextInput}
                        />

                    </Grid>

                    <br />
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        name="image"
                        value=""
                        onChange={onFileChange}
                        type="file"

                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span">
                            Upload Product Photo
                        </Button>
                    </label>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productCategory}
                            onChange={handleProductCategory}
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id}
                                    value={category.id}
                                >
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkbox.publish}
                                onChange={handleCheckbox}
                                name="publish"
                                color="primary"
                            />

                        }
                        label="Publish"
                    />
                    <br />

                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="flex-start"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleAddPost}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>

                        {/* <Button
                            className={classes.button}
                            onClick={handleReset}
                            color="secondary">
                            Reset
                        </Button> */}
                    </Grid>

                </Grid>
            </form>

        </div>
    )
}
