import React, { useState, useEffect } from "react";
// Material ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField, FormControl, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import usePageStyles from "../../styles/pageStyle";
// End material ui
import PostApi from "../../api/Post";
import LoadingBar from "../../components/LoadingBar";
import { Link } from "react-router-dom";
import DataUtil from "../../util/Data";

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
    const [msg, setMsg] = useState("");
    const [posts, setPosts] = useState([]);

    // utility
    // Use loading hook for page infinite scrolling
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const updateUi = () => {
        getPost(limit);
    };

    // Fetch post
    const getPost = (postLimit) => {
        PostApi.getPosts(
            postLimit,
            (res) => {
                setPosts(res.data.data);
                isPostLoad = true;
            },
            (error) => {
                console.log(error);
            }
        );
    };

    // Fetch post by search
    const getPostBySearch = (text) => {
        PostApi.getPostBySearch(
            text,
            (res) => {
                setPosts(res.data.data);
                isPostLoad = false;
            },
            (error) => {
                console.log(error);
            }
        );
    };

    // Get text value from input
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };

    // Execute search
    const handleSearchPost = () => {
        getPostBySearch(searchQuery);
    };

    const handleDeletePost = (id) => {
        var bool = confirm("Are you sure to delete (this cannot be undone)");

        if (bool) {
            PostApi.deletePostById(
                id,
                (res) => {
                    setMsg("Deleted successfully");
                    updateUi();
                },
                (err) => {
                    setMsg(err);
                }
            );
            setMsg("");
        }
    };

    // Scrolling function
    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    };
    const trackScrolling = () => {
        if (isPostLoad == true) {
            const wrappedElement = document.getElementById("body");
            if (isBottom(wrappedElement)) {
                //
                limit = limit + 50;
                getPost(limit);
            }
        }
    };

    // End Scrolling function
    useEffect(() => {
        // Update ui
        updateUi();
    }, []);

    return (
        <div id="body" className={classes.content}>
            <div className={classes.toolbar} />

            <h1>{msg}</h1>

            <h1>All Products</h1>

            <FormControl>
                <TextField
                    onChange={handleSearchQuery}
                    id="filled-basic"
                    label="Search Product"
                    variant="filled"
                />
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
                            <TableCell>Name</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell>Is Image External</TableCell>
                            <TableCell>Is Link External</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.length == 0 ? (
                            <LoadingBar />
                        ) : (
                            posts.map((post, index) => (
                                <TableRow key={post.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() =>
                                                handleDeletePost(post.id)
                                            }
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>{" "}
                                        |{" "}
                                        <Link to={"/admin/edit/" + post.id}>
                                            Edit
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {post.title == null ? "" : post.title}
                                    </TableCell>

                                    <TableCell>
                                        {DataUtil.isExist(post.link)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(post.is_image_ext)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(post.is_link_ext)}
                                    </TableCell>
                                    <TableCell>
                                        {DataUtil.isExist(post.image)}
                                    </TableCell>
                                    <TableCell>
                                        {post.category == null
                                            ? ""
                                            : post.category.title}
                                    </TableCell>
                                    <TableCell>
                                        {post.status == null ? "" : post.status}
                                    </TableCell>
                                    <TableCell>{post.created_at}</TableCell>
                                    <TableCell>{post.updated_at}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
