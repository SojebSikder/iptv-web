import axios from "axios";
import Config from "../config/app";
const Auth = {

    getUsers: (successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/users?getByType=all', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getUsersByType: (data, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/users?getByType=' + data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getUserById: (id, successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/users/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    updateUser: (data, successCb, failCb) => {

        axios.post(Config.getAdminUrl() + '/update_user', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    //


    login: (data, successCb, failCb) => {
        axios.post(Config.getAdminUrl() + '/login', data).then(response => {
            successCb(response);
        }).catch(err => {
            failCb(err);
        });
    },
    register: (data, successCb, failCb) => {
        axios.post(Config.getAdminUrl() + '/register', data).then(response => {
            successCb(response);
        }).catch(err => {
            failCb(err);
        });
    },
    logout: (successCb, failCb) => {
        axios.get(Config.getAdminUrl() + '/logout', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                localStorage.clear();
                successCb(response);
            }).catch(err => {
                failCb(err);
                alert(err.response.data.message);
            });

        localStorage.clear();
    },

    checkAuth: (successCb, failCb) => {

        if (localStorage.getItem("token") != null) {
            axios.get(Config.getAdminUrl() + '/check-auth', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    successCb(res);
                })
                .catch(err => {
                    failCb(err);
                });
        } else {
            return false;
        }
    }

};
export default Auth;