import React, { useState, useEffect } from 'react'
// Material ui
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// End material ui
import usePageStyles from '../../../styles/pageStyle';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import NotificationsApi from '../../../api/Notification';

export default function Add() {
    const classes = usePageStyles();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isImage, setIsImage] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageName, setImageName] = useState('');

    const [msg, setMsg] = useState();

    // Handle title
    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    }
    // Handle Description
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value);
    }
    // Handle isImage
    const handleIsImage = (e) => {
        setIsImage(e.target.checked);
    }
    // Handle Image Url
    const handleImageUrlInput = (e) => {
        setImageUrl(e.target.value);
        setImageName(e.target.value);
    }
    // Handle Send Notification
    const handleSendNotification = () => {

        if (isImage) {

            const data = {
                "title": title,
                "body": description,
                "imageUrl": imageUrl,
                "imageName": imageName
            };

            NotificationsApi.sendNotification(data, (res) => {
                setMsg("Notification sent");

            }, (err) => {
                setMsg("Something wrong");
            });
            setMsg('');
        } else {
            const data = {
                "title": title,
                "body": description
            };

            NotificationsApi.sendTextNotification(data, (res) => {
                reset();
                setMsg("Notification sent");

            }, (err) => {
                setMsg("Something wrong");
            });
            setMsg('');
        }

    }

    const reset = () => {
        setTitle('');
        setDescription('');
        setIsImage(false);
        setImageUrl('');
        setImageName('');
    }
    //

    useEffect(() => {

    }, [])


    const ImageUrlInputBox = isImage
        ? <div>
            <TextField
                id="outlined-basic"
                label="Image Url"
                variant="outlined"
                multiline
                rows={4}
                name="ImageUrl"
                value={imageUrl}
                onChange={handleImageUrlInput}
            />
        </div>
        : null;

    return (

        <div className={classes.content} >
            <div className={classes.toolbar} />

            <h1>Send Notification</h1>
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
                        label="Title"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="title"
                        value={title}
                        onChange={handleTitleInput}
                    />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="description"
                        value={description}
                        onChange={handleDescriptionInput}
                    />

                    <br />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isImage}
                                onChange={handleIsImage}
                                name="isImage"
                                color="primary"
                            />

                        }
                        label="Upload Image"
                    />
                    <br />
                    {ImageUrlInputBox}
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSendNotification}
                    >
                        Send
                    </Button>
                </Grid>

            </form>

        </div>
    )
}
