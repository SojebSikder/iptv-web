import axios from "axios";
import Config from "../classes/Config";

// get posts
const CategoryApi = {
    addCategory: (data, successCb, failCb) => {
        axios.post(Config.getUrl() + '/category', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    getCategories: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/category', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getCategoryById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateCategory: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/category/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteCategoryById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default CategoryApi;