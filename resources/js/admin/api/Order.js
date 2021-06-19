import axios from "axios";
import Config from "../classes/Config";

// get posts
const OrderApi = {
    getOrder: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/order?all=1', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
                //alert(err.response.data.message);
            });
    },
    getOrderById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/order/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateOrderById: (id, data, successCb, failCb) => {
        axios.put(Config.getUrl() + '/order/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });

    }


};
export default OrderApi;