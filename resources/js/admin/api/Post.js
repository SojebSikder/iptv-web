import axios from "axios";
import Config from "../config/app";

// get posts
const PostApi = {
    // const user ={
    //     username: this.state.username,
    //     password: this.state.password
    // }
    // getPosts: (successCb, failCb) => {
    //     axios.get(Config.getAdminUrl() + '/posts?all=1', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
    //         .then(response => {
    //             successCb(response);
    //         }).catch(err => {
    //             failCb(err);
    //             //alert(err.response.data.message);
    //         });
    // },
    // fetch all post by limit
    getPosts: (limit, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/tv?recent=2&limit=' + limit, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
                //alert(err.response.data.message);
            });
    },
    // fetch all post by search
    getPostBySearch: (text, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/tv?search=' + text, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
                //alert(err.response.data.message);
            });
    },
    getPostById: (id, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/tv/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    addPosts: (data, successCb, failCb) => {
        // const data = new FormData();
        // data.append(
        //     'image',
        //     image,
        //     image.name
        // );
        // axios.post(Config.getAdminUrl() + '/posts', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
        //     .then(response => {
        //         successCb(response);
        //     }).catch(err => {
        //         failCb(err);
        //         //alert(err.response.data.message);
        //     });

        axios.post(Config.getAdminUrl() + '/tv', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
                //alert(err.response.data.message);
            });
    },
    updatePost: (id, data, successCb, failCb) => {

        axios.put(Config.getAdminUrl() + '/tv/' + id, data, { crossDomain: true, headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    updatePostPhoto: (id, data, successCb, failCb) => {

        axios.post(Config.getAdminUrl() + '/tv/' + id, data, { crossDomain: true, headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deletePostById: (id, successCb, failCb) => {
        axios.delete(Config.getAdminUrl() + '/tv/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default PostApi;