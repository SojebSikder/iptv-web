import axios from "axios";
import Config from "../classes/Config";

// get posts
const NotificationsApi = {

    // sendNotification: (data, successCb, failCb) => {
    //     axios.post(Config.getNodeUrl() + '/notification',
    //         data,
    //         {
    //             crossorigin: true, crossDomain: true,
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         })
    //         .then(response => {
    //             successCb(response);
    //         }).catch(err => {
    //             failCb(err);
    //         });
    // },

    /**
     * Send Text Notification with image
     * @param {*} data 
     * @param {*} successCb 
     * @param {*} failCb 
     */
    sendNotification: (data, successCb, failCb) => {
        axios.post(Config.getNodeUrl() + '/notification?title=' + data.title + '&body=' + data.body + '&imageUrl=' + data.imageUrl + '&imageName=' + data.imageName,
            data)
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    /**
     * Send Text Notification
     * @param {*} data 
     * @param {*} successCb 
     * @param {*} failCb 
     */
    sendTextNotification: (data, successCb, failCb) => {
        axios.post(Config.getNodeUrl() + '/textnotification?title=' + data.title + '&body=' + data.body,
            data)
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },


};
export default NotificationsApi;