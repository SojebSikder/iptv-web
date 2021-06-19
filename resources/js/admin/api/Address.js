import axios from "axios";
import Config from "../classes/Config";

// get posts
const AddressApi = {

    getAddressById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/address/' + id + "?admin=admin", { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },



};
export default AddressApi;