
const URL = "https://enigmatic-coast-30495.herokuapp.com";

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
    },
    /**
     * Get nodejs api address
     */
    getNodeUrl: () => {
        return "https://healthcity-node.herokuapp.com";
    },
}

export default Config;