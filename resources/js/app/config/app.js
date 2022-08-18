import AdminConfig from '../../admin/config/app';
/**
 * Basic Configuration
 */
const Config = {
    /**
     * Get api address
     */
    getUrl: () => {
        return AdminConfig.getUrl();
        //return 'http://192.168.10.235/api';
       //return 'http://127.0.0.1:8000/api';
    },
    /**
     * Get server base address
     */
    getBase: () => {
        return AdminConfig.getBase();
        //return 'http://192.168.10.235';
        //return 'http://127.0.0.1:8000';
    },
}

export default Config;