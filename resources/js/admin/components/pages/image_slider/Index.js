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
import ImageSliderApi from '../../../api/ImageSlider';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';
import Config from '../../../classes/Config';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Index() {
    const classes = usePageStyles();
    const tableStyle = useTableStyles();

    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');

    const deleteById = (id) => {
        var bool = confirm('Are you sure to delete (this cannot be undone)');

        if (bool) {
            ImageSliderApi.deleteImageSliderById(id, (res) => {
                setMsg('Deleted Image Successfully');
                updateUi();
            }, (err) => {
                setMsg(err);
            });
            setMsg('');
        }
    }

    const updateUi = () => {
        ImageSliderApi.getImageSliders((res) => {
            setCategories(res.data.data);
        }, (err) => {

        });
    }

    useEffect(() => {
        updateUi();
    }, [])


    return (
        <div className={classes.content}>
            <div className={classes.toolbar} />

            <h1>All Images</h1>

            {msg}

            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>SL</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length == 0 ? <LoadingBar /> : categories.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell><Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => deleteById(post.id)}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button> </TableCell>
                                <TableCell component="th" scope="row">
                                    {post.id == null ? "" : post.id}
                                </TableCell>
                                <TableCell> <a target="_blank_" href={Config.getBase() + "/uploads/ads/" + post.image_url}> <img width='50' height="50" src={Config.getBase() + "/uploads/ads/" + post.image_url} alt="" /></a></TableCell>

                                <TableCell>{post.url}</TableCell>
                                <TableCell>{post.created_at}</TableCell>
                                <TableCell>{post.updated_at}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}
