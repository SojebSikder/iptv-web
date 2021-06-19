/**
 * It is used for Session Management
 */
class SessionService{

    /**
     * Set session value
     * @param {*} key 
     * @param {*} value 
     */
    set(key, value){
        localStorage.setItem(key, value);
    }

    /**
     * Get session value
     * @param {*} key 
     */
    get(key){
      let data = localStorage.getItem(key);
      return data;
    }

    /**
     * Remove session value
     * @param {*} key 
     */
    remove(key){
        localStorage.removeItem(key);
    }

    /**
     * Remove all session value
     */
    removeAll(){
        localStorage.clear();
    }
}

export default new SessionService();