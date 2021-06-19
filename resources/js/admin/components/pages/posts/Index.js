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
import { Button, TextField, FormControl, Input, InputLabel, FormHelperText, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import usePageStyles from '../../../styles/pageStyle';
// End material ui
import PostApi from '../../../api/Post';
import LoadingBar from '../../LoadingBar';
import { Link } from 'react-router-dom';
import Auth from '../../../api/Auth';
import DataUtil from '../../../util/Data';


const useTableStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// This is for post limit
let limit = 12;
let isPostLoad = true;
//
export default function Index() {
    // hooks
    const classes = usePageStyles();
    const tableStyle = useTableStyles();
    const [msg, setMsg] = useState('');
    const [posts, setPosts] = useState([]);

    // utility
    // Use loading hook for page infinite scrolling
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);


    const updateUi = () => {
        getPost(limit);
    }

    // Fetch post
    const getPost = (postLimit) => {
        PostApi.getPosts(postLimit, (res) => {
            setPosts(res.data.data);
            isPostLoad = true;
        }, (error) => {
            console.log(error);
        });
    }

    // Fetch post by search
    const getPostBySearch = (text) => {
        PostApi.getPostBySearch(text, (res) => {
            setPosts(res.data.data);
            isPostLoad = false;
        }, (error) => {
            console.log(error);
        });
    }

    // Get text value from input
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);

    }

    // Execute search
    const handleSearchPost = () => {
        getPostBySearch(searchQuery);
    }

    const handleDeletePost = (id) => {

        var bool = confirm('Are you sure to delete (this cannot be undone)');

        if (bool) {

            PostApi.deletePostById(id, (res) => {
                setMsg('Deleted successfully');
                updateUi();
            }, (err) => {
                setMsg(err);
            });
            setMsg('');
        }
    }


    // Scrolling function
    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
    const trackScrolling = () => {
        if (isPostLoad == true) {
            const wrappedElement = document.getElementById('body');
            if (isBottom(wrappedElement)) {
                //
                limit = limit + 50;
                // Fetch Post
                getPost(limit);
                //
                //console.log('header bottom reached');
                //document.removeEventListener('scroll', trackScrolling);
            }
        }

    };


    // End Scrolling function
    useEffect(() => {
        // componentDidMount
        document.addEventListener('scroll', trackScrolling);

        // Update ui
        updateUi();

        // componentWillUnmount
        return () => {
            document.removeEventListener('scroll', trackScrolling);
        }

    }, []);


    return (
        <div id="body" className={classes.content}>
            <div className={classes.toolbar} />

            <h1>{msg}</h1>
            {/* {console.log(Auth.checkAuth() == true ? "logged" : "not logged")} */}

            <h1>All Products</h1>

            <FormControl>
                <TextField onChange={handleSearchQuery} id="filled-basic" label="Search Product" variant="filled" />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSearchPost}
                >
                    Search
                </Button>
            </FormControl>

            <br />



            <TableContainer component={Paper}>
                <Table className={tableStyle.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SL</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Product Description</TableCell>
                            <TableCell>Brand Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Qntity PC Type</TableCell>
                            <TableCell>Qntity Strip Type</TableCell>
                            <TableCell>Qntity Box Type</TableCell>
                            <TableCell>Qntity</TableCell>
                            <TableCell>Strip Qntity</TableCell>
                            <TableCell>Box Qntity</TableCell>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.length == 0 ? <LoadingBar /> : posts.map((post, index) => (
                            <TableRow key={post.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={() => handleDeletePost(post.product_id)}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button> | <Link to={"/admin/edit/" + post.product_id}>Edit</Link>
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {post.title == null ? "" : post.title}
                                </TableCell>
                                <TableCell align="right">{post.content == null ? "" : DataUtil.textShorten(post.content)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.brand_name)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.price)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.qnty_pc_type)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.qnty_strip_type)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.qnty_box_type)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.qnty)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.strip_qnty)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.box_qnty)}</TableCell>
                                <TableCell>{DataUtil.isExist(post.image)}</TableCell>
                                <TableCell>{post.category == null ? "" : post.category.title}</TableCell>
                                <TableCell>{post.published == null ? "" : post.published}</TableCell>
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
