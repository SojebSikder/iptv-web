import axios from "axios";
import Config from "../config/app";

// get posts
const PasswordApi = {
    recover: (data, successCb, failCb) => {
        axios
            .post(Config.getUrl() + "/recover-password", data)
            .then((response) => {
                successCb(response);
            })
            .catch((err) => {
                failCb(err);
            });
    },
};
export default PasswordApi;
