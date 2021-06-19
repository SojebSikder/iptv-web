import React, { useState, useEffect } from 'react'
// Material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// End material ui
import usePageStyles from '../../../styles/pageStyle';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import ImageSliderApi from '../../../api/ImageSlider';


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
    const classes = useStyles();
    const classesEx = usePageStyles();

    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const [url, setUrl] = useState('');
    const [isUrl, setIsUrl] = useState(false);



    const handleIsUrl = (e) => {
        setIsUrl(e.target.checked);
    }

    const handleUrlInput = (e) => {
        setUrl(e.target.value);
    }

    const onFileChange = (event) => {
        setImage(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const reset = () => {
        // setTitle('');
        setImage('');
        setUrl('');
    }

    const handleAddCategory = () => {
        const data = new FormData();

        //data.append('title', title);
        data.append('image', image, image.name);

        if (url) {
            data.append('url', url);
        }

        ImageSliderApi.addImageSlider(data, (res) => {
            setMsg('Image added');
            reset();
        }, (err) => {
            setMsg(err);
        });
    }

    useEffect(() => {

    }, [])

    const urlElement = isUrl
        ? <div>
            <TextField
                id="outlined-basic"
                label="Image Url"
                variant="outlined"
                multiline
                rows={4}
                name="url"
                value={url}
                onChange={handleUrlInput}
            />
        </div>
        : null;

    return (
        <div className={classesEx.content}>
            <div className={classesEx.toolbar} />

            <h1>Add Category</h1>

            <h1>{msg}</h1>

            <form autoComplete="off">

                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >


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
                            Upload Image Slider Photo
                        </Button>
                    </label>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isUrl}
                                onChange={handleIsUrl}
                                name="isUrl"
                                color="primary"
                            />

                        }
                        label="Add Url"
                    />
                    <br />

                    {urlElement}

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
    )
}
