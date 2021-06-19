import axios from "axios";
import Config from "../classes/Config";
const Auth = {

    getUsers: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/users?getByType=all', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getUsersByType: (data, successCb, failCb) => {
        axios.get(Config.getUrl() + '/users?getByType=' + data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getUserById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/users/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    updateUser: (data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/update_user', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    //


    login: (data, successCb, failCb) => {
        axios.post(Config.getUrl() + '/login', data).then(response => {
            // for (var i in response.data.user) {
            //     localStorage.setItem("user." + i, res.data.user[i]);
            //     //SessionService.set("user." + i, res.data.user[i]);
            // }
            successCb(response);
        }).catch(err => {
            failCb(err);
        });
    },
    logout: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/logout', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                localStorage.clear();
                successCb(response);
            }).catch(err => {
                failCb(err);
                alert(err.response.data.message);
            });

        localStorage.clear();
    },
    // checkAuth: (successCb, failCb) => {
    //     axios.get(Config.getUrl() + '/check-auth', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
    //         .then(response => {
    //             successCb(response);
    //         }).catch(err => {
    //             failCb(err);
    //         });
    // }

    checkAuth: (successCb, failCb) => {

        if (localStorage.getItem("token") != null) {
            axios.get(Config.getUrl() + '/check-auth', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
                .then(res => {
                    successCb(res);
                })
                .catch(err => {
                    failCb(err);
                });
            // if (value == "Error: Request failed with status code 401") {
            //     return false;
            // }else{
            //     return true;
            // }
        } else {
            return false;
        }
    }

    // checkAuth: () => {

    //     // if(localStorage.getItem("token") != null){
    //     //     return true
    //     // }else{
    //     //     return false;
    //     // }

    //     if (localStorage.getItem("token") != null) {

    //         return true
    //     } else {
    //         return false;
    //     }

    // }
};
export default Auth;