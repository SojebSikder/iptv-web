import axios from "axios";
import Config from "../classes/Config";

// get posts
const PrescriptionApi = {

    getPrescription: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/prescription', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    updatePrescription: (id, data, successCb, failCb) => {
        axios.put(Config.getUrl() + '/prescription/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },



};
export default PrescriptionApi;