import axios from "axios";
import Config from "../config/app";

// get posts
const CategoryApi = {
    addCategory: (data, successCb, failCb) => {
        axios.post(Config.getAdminUrl() + '/category', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    getCategories: (successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/category', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getCategoryById: (id, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateCategory: (id, data, successCb, failCb) => {

        axios.post(Config.getAdminUrl() + '/category/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteCategoryById: (id, successCb, failCb) => {
        axios.delete(Config.getAdminUrl() + '/category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default CategoryApi;