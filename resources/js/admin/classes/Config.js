
//dotenv.config({ path: path.resolve(__dirname + '/.env') });

//const URL = process.env.SERVER_URL || "http://localhost";

const URL = "http://127.0.0.1:8000";
//const URL = "http://localhost";
//const URL = "http://127.0.0.1:8000";

/**
 * Basic Configuration
 */

const Config = {
    /**
     * App Name
     * @returns {String}
     */
    getAppName: () => {
        return "IPTV";
    },
    /**
     * App Slogan
     * @returns {String}
     */
    getAppSlogan: () => {
        return "IPTV";
    },
    /**
     * Play store link
     * @returns {String}
     */
    getAppPlayStoreLink: () => {
        return "https://play.google.com/store/apps/details?id=com.dealzia.healthcity";
    },
    //
    /**
     * Get api address
     */
    getUrl: () => {
        return URL + '/api';
    },
    /**
     * Get server base address
     */
    getBase: () => {
        return URL;
        //return 'http://192.168.10.235';
    },
    /**
     * Get nodejs api address
     */
    getNodeUrl: () => {
        return "https://healthcity-node.herokuapp.com";
    },
}

export default Config;