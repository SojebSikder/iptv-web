import axios from "axios";
import Config from "../classes/Config";

// get posts
const DoctorCategoryApi = {
    addDoctorCategory: (data, successCb, failCb) => {
        axios.post(Config.getUrl() + '/doctor_category', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    getDoctorCategories: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/doctor_category', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getDoctorCategoryById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/doctor_category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateDoctorCategory: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/doctor_category/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteDoctorCategoryById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/doctor_category/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default DoctorCategoryApi;