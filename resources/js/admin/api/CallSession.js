import axios from "axios";
import Config from "../classes/Config";

// get posts
const CallSessionApi = {
    getCallSession: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/call_session', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getCallSessionById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/call_session/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateCallSession: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/call_session/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteCallSessionById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/call_session/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default CallSessionApi;