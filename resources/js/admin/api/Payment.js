import axios from "axios";
import Config from "../classes/Config";

// get posts
const PaymentApi = {
    getPayments: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/payment', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getPaymentyById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/payment/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    addPayment: (data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/payment', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    updatePayment: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/payment/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deletePaymentById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/payment/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default PaymentApi;