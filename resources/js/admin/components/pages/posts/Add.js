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

    const [msg, setMsg] = useState('');

    const [categories, setCategories] = useState([]);

    // Methods for handling add post
    const handleAddPost = () => {
        const data = new FormData();

        data.append('title', textInput.name);
        data.append('link', textInput.link);

        data.append('is_image_ext', checkbox.imageExt.toString());
        data.append('is_link_ext', checkbox.linkExt.toString());

        if (image != null) {
            data.append('image', image, image.name);
        }

        data.append('status', checkbox.status == true ? 1 : 0);
        data.append('category_id', productCategory);

        PostApi.addPosts(data, (res) => {
            //console.log(res);
            setMsg("Tv Added successfully!");
            reset();
        }, (err) => {
            //console.log(err);
            setMsg("Something wrong :(");
        });

        setMsg("");


    }

    const reset = () => {
        setTextInput({ ["name"]: "" });
        setTextInput({ ["link"]: "" });
        setImage("");
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
        name: '',
        link: '',
    });

    const [checkbox, setCheckbox] = useState({
        imageExt: false,
        linkExt: false,
        status: true,
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

            <h1>{msg}</h1>

            <form autoComplete="off">

                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >

                    <TextField
                        id="outlined-basic"
                        label="Channel Name"
                        variant="outlined"
                        required
                        name="name"
                        value={textInput.name}
                        onChange={handleTextInput}
                    />
                    <br />

                    <TextField
                        id="outlined-basic"
                        label="Tv Link"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="link"
                        value={textInput.link}
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
                                    checked={checkbox.linkExt}
                                    onChange={handleCheckbox}
                                    name="linkExt"
                                    color="primary"
                                />

                            }
                            label="Is Link External"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkbox.imageExt}
                                    onChange={handleCheckbox}
                                    name="imageExt"
                                    color="primary"
                                />

                            }
                            label="Is Image External"
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
                            Upload Tv Channel Photo
                        </Button>
                    </label>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tv Category</InputLabel>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checkbox.status}
                                onChange={handleCheckbox}
                                name="status"
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
