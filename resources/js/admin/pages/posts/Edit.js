import React, { useState, useEffect } from "react";
import Config from "../../config/app";
import UrlHelper from "../../helpers/UrlHelper";
// Material ui
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import usePageStyles from "../../styles/pageStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CategoryApi from "../../api/category";
import PostApi from "../../api/Post";
import {
    CustomError,
    CustomSuccess,
} from "../../components/messages/CustomMsg";
// End material ui

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

export default function Edit(props) {
    // style hook
    const exClasses = usePageStyles();
    const classes = useStyles();
    // end style hook

    const [categories, setCategories] = useState([]);
    const [error_message, setError_message] = useState("");
    const [message, setMessage] = useState("");

    const handleImageSave = () => {
        // update photo
        const data = new FormData();
        data.append("image", image, image.name);
        data.append("_method", "PATCH");

        PostApi.updatePostPhoto(
            props.match.params.id,
            data,
            (res) => {
                setMessage(res.data.message);
            },
            (err) => {
                if (err == "Error: Request failed with status code 401") {
                    UrlHelper.fallback(props);
                }
                setError_message(err.response.data.message);
            }
        );
    };
    // Methods for handling add post
    const handleEditPost = () => {
        setMessage(null);
        setError_message(null);
        const data = {
            title: textInput.productName,
            link: textInput.productDetails,

            is_image_ext: checkbox.qntyPcType,
            is_link_ext: checkbox.qntyStripType,

            //Image: image,
            status: checkbox.publish,
            category_id: productCategory,
        };

        PostApi.updatePost(
            props.match.params.id,
            data,
            (res) => {
                setMessage(res.data.message);
                updateUi();
            },
            (err) => {
                if (err == "Error: Request failed with status code 401") {
                    UrlHelper.fallback(props);
                }
                setError_message(err.response.data.message);
            }
        );
    };

    const updateUi = () => {
        // fetch post  by id
        PostApi.getPostById(
            props.match.params.id,
            (res) => {
                // Set text value
                setTextInput({
                    ...textInput,
                    ["productName"]:
                        res.data.data[0].title == null
                            ? ""
                            : res.data.data[0].title,
                    ["productDetails"]:
                        res.data.data[0].link == null
                            ? ""
                            : res.data.data[0].link,
                });

                // set checkbox value
                setCheckbox({
                    ...checkbox,
                    ["qntyPcType"]: res.data.data[0].is_image_ext,
                    ["qntyStripType"]: res.data.data[0].is_link_ext,
                    ["publish"]: res.data.data[0].status,
                });

                // set product category
                setProductCategory(res.data.data[0].category_id);
                // set image
                setImage(res.data.data[0].image);
            },
            (err) => {}
        );
        // end fetch post by id
        // fetch categories
        CategoryApi.getCategories(
            (res) => {
                setCategories(res.data.data);
            },
            (err) => {}
        );
        // end fetching category
    };

    useEffect(() => {
        updateUi();
    }, []);

    // element hook
    const [image, setImage] = useState("");
    const onFileChange = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const [productCategory, setProductCategory] = useState("");

    const [textInput, setTextInput] = useState({
        productName: "",
        productDetails: "",
    });

    const [checkbox, setCheckbox] = useState({
        qntyPcType: "true",
        qntyStripType: "true",
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
        if (event.target.name == "publish") {
            setCheckbox({
                ...checkbox,
                ["publish"]: event.target.checked == true ? 1 : 2,
            });
        } else {
            setCheckbox({
                ...checkbox,
                [event.target.name]:
                    event.target.checked == true ? "true" : "false",
            });
        }
    };
    // end element hook method
    return (
        <div className={exClasses.content}>
            <div className={exClasses.toolbar} />
            <h1>Edit Channel</h1>
            {error_message ? <CustomError msg={error_message} /> : null}
            {message ? <CustomSuccess msg={message} /> : null}
            <form method="post" autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Paper variant="outlined">
                            <img
                                height="200"
                                width="200"
                                src={
                                    Config.getBase() +
                                    "/uploads/product/" +
                                    image
                                }
                            />
                        </Paper>

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
                                component="span"
                            >
                                Upload Product Photo
                            </Button>
                        </label>
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleImageSave}
                            startIcon={<SaveIcon />}
                        >
                            Save Image
                        </Button>
                        <br />
                    </Grid>

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

                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            checkbox.qntyPcType == "true"
                                                ? true
                                                : false
                                        }
                                        onChange={handleCheckbox}
                                        name="qntyPcType"
                                        color="primary"
                                    />
                                }
                                label="Is Image External"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={
                                            checkbox.qntyStripType == "true"
                                                ? true
                                                : false
                                        }
                                        onChange={handleCheckbox}
                                        name="qntyStripType"
                                        color="primary"
                                    />
                                }
                                label="Is Link External"
                            />
                        </Grid>

                        <br />

                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                                Product Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productCategory}
                                onChange={handleProductCategory}
                                required
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
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
                                    checked={
                                        checkbox.publish == 1 ? true : false
                                    }
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
                                onClick={handleEditPost}
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
                </Grid>
            </form>
        </div>
    );
}
