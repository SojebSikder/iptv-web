/**
 * Data Uril
 */
const DataUtil = {
    /**
     * Check if it exists
     * @param {any} data 
     * @returns {any}
     */
    isExist: (data) => {
        if (data == null) {
            return "";
        } else {
            return data;
        }
    },

    /**
     * Extract parts of a string
     * @param {string} text 
     */
    textShorten: (text, length = 100) => {
        var result = text.substr(0, length) + "...";
        return result;
    }



};
export default DataUtil;