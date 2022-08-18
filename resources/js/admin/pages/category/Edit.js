import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import usePageStyles from "../../styles/pageStyle";
import CategoryApi from "../../api/category";
import Config from "../../config/app";

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
    const classes = useStyles();
    const classesEx = usePageStyles();

    const [msg, setMsg] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [imageChanged, setImageChanged] = useState();

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    };

    const onFileChange = (event) => {
        setImage(event.target.files[0]);
        setImageChanged(true);
    };

    const handleUpdateCategory = () => {
        const data = new FormData(document.getElementById("form"));
        data.append("title", title);
        if (imageChanged == true) {
            data.append("image", image, image.name);
        }
        data.append("_method", "PATCH");

        CategoryApi.updateCategory(
            props.match.params.id,
            data,
            (res) => {
                setMsg("Category Updated");
            },
            (err) => {
                setMsg(err);
            }
        );
    };

    useEffect(() => {
        CategoryApi.getCategoryById(
            props.match.params.id,
            (res) => {
                setTitle(res.data.data[0].title);
                setImage(res.data.data[0].image);
                //console.log(res.data.data[0]);
            },
            (err) => {}
        );
    }, []);

    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>Edit Category</h1>

            <h1>{msg}</h1>

            <form id="form" autoComplete="off">
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    <Paper variant="outlined">
                        <img
                            height="200"
                            width="200"
                            src={
                                Config.getBase() + "/uploads/category/" + image
                            }
                        />
                    </Paper>

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
                            Upload Category Photo
                        </Button>
                    </label>

                    <br />

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

                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleUpdateCategory}
                    >
                        Save
                    </Button>
                </Grid>
            </form>
        </div>
    );
}
