import axios from "axios";
import Config from "../classes/Config";

// get posts
const ImageSliderApi = {
    addImageSlider: (data, successCb, failCb) => {
        axios.post(Config.getUrl() + '/image_slider', data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    getImageSliders: (successCb, failCb) => {
        axios.get(Config.getUrl() + '/image_slider', { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    getImageSliderById: (id, successCb, failCb) => {
        axios.get(Config.getUrl() + '/image_slider/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },
    updateImageSlider: (id, data, successCb, failCb) => {

        axios.post(Config.getUrl() + '/image_slider/' + id, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

    deleteImageSliderById: (id, successCb, failCb) => {
        axios.delete(Config.getUrl() + '/image_slider/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem("token") } })
            .then(response => {
                successCb(response);
            }).catch(err => {
                failCb(err);
            });
    },

};
export default ImageSliderApi;