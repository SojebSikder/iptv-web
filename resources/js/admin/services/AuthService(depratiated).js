import axios from "axios";
import Config from "../classes/Config";
import Userinfo from "../classes/Userinfo";
import SessionService from "./SessionService";

/**
 * Manage authentication
 */
const AuthService = {
    /**
     * Login with api
     */
    login: (user, calback) => {
        // const user ={
        //     username: this.state.username,
        //     password: this.state.password
        // }
        axios.post(Config.getUrl() + "/login", user)
            .then(res => {
                if (res.data.success == true) {
                    // Set sesiion
                    // SessionService.set('id', res.data.user.id);
                    // SessionService.set('name', res.data.user.name);
                    // Userinfo.setToken(res.data.token);
                    // for (var i in res.data.user) {
                    //     SessionService.set("user." + i, res.data.user[i]);
                    // }
                    // for (var i in res.data.user) {
                    //     localStorage.setItem("user." + i, res.data.user[i]);
                    //     SessionService.set("user." + i, res.data.user[i]);
                    // }

                    //SessionService.set('token', res.data.token);

                } else if (res.data.success == false) {

                }
                calback(res);
            }).catch(error => {
                //this.setState({alert_message:'error'});
            });
    },
    /**
     * Register with api
     */
    register: (user, callback) => {
        axios.post(Config.getUrl() + "/register", user)
            .then(res => {
                callback(res);
                //this.setState({alert_message:'success'});
            }).catch(error => {
                //this.setState({alert_message:'error'});
            });
    },
    /**
     * Check if user is authenticated or not
     */
    isLogged: () => {
        if (SessionService.get('token') != null) {
            return true;
        } else {

            return false;
        }
    },

    /**
     * Logout user
     */
    logout: (callback) => {
        const user = {
            token: Userinfo.getToken(),
        }
        axios.post(Config.getUrl() + "/logout", user)
            .then(res => {
                SessionService.removeAll();
                callback(res);
            }).catch(error => {
                //this.setState({alert_message:'error'});
            });

        SessionService.removeAll();

    },
}


export default AuthService;



// for Login
/*
axios.post(Config.getUrl()+"/user/login", user)
.then(res=>{
    if(res.data.status == 0)
    {
        this.setState({alert_message:'error'});
    }else if(res.data.status == 1){
        this.setState({alert_message:'success'});
    }

}).catch(error=>{
    this.setState({alert_message:'error'});
}); */

// for register
/*
axios.post(Config.getUrl()+"/user/register", user)
.then(res=>{
this.setState({alert_message:'success'});
}).catch(error=>{
this.setState({alert_message:'error'});
});
*/