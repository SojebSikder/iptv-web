import React, { useState, useEffect } from "react";
// Material ui
import { makeStyles } from "@material-ui/core/styles";
// End material ui
import usePageStyles from "../../styles/pageStyle";
import { Button, Grid, TextField } from "@material-ui/core";
import CategoryApi from "../../api/category";
import { CustomError, CustomSuccess } from "../../components/messages/CustomMsg";

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

export default function Add() {
    const classes = useStyles();
    const classesEx = usePageStyles();

    const [error_message, setError_message] = useState("");
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    };

    const onFileChange = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const reset = () => {
        setTitle("");
        setImage("");
    };

    const handleAddCategory = () => {
        const data = new FormData();

        data.append("title", title);
        //data.append('image', image, image.name);

        CategoryApi.addCategory(
            data,
            (res) => {
                setMessage(res.data.message);
                reset();
            },
            (err) => {
                setError_message(err.response.data.message);
            }
        );
    };

    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>Add Category</h1>

            {error_message ? <CustomError msg={error_message} /> : null}
            {message ? <CustomSuccess msg={message} /> : null}

            <form autoComplete="off">
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="title"
                        value={title}
                        onChange={handleTitleInput}
                    />
                    {/* <br />
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
                            Upload Category Photo
                        </Button>
                    </label> */}

                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleAddCategory}
                    >
                        Add
                    </Button>
                </Grid>
            </form>
        </div>
    );
}
