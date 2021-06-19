import axios from "axios";
import Config from "../classes/Config";

// get posts
const PasswordApi = {
    // const user ={
    //     username: this.state.username,
    //     password: this.state.password
    // }
    recover: (data, successCb, failCb) => {
        axios.post(Config.getUrl() + '/recover-password', data)
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },


};
export default PasswordApi;