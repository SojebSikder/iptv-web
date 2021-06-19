import axios from "axios";

const User = {
    list: (page = 1) => {
        return axios.get('/users?page=' + page, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    add: (payload) => {
        return axios.post('/users', payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    showOne: (id) => {
        return axios.get('/users/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    edit: (payload, id) => {
        return axios.put('/users/' + id, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    remove: (id) => {
        return axios.delete('/users/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    profile: () => {
        return axios.get('/profile', { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
    updateProfile: (payload) => {
        return axios.post('/profile/update', payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem("user.api_token") } });
    },
};

export default User;