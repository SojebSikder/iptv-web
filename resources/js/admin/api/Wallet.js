import axios from "axios";
import Config from "../classes/Config";

// get posts
const WalletApi = {
    getWallets: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/wallet', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getWalletById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/wallet/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateWallet: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/wallet/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteWalletById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/wallet/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default WalletApi;