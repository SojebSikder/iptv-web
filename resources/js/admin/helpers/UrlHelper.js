/**
 * This contains some usefull function for url
 */
const UrlHelper = {
    /**
     * 
     * @param {*} props props
     * @param {*} url url
     */
    redirectTo: (props, url) => {
        //return <Redirect to={url} />;

        props.history.push(url);
    },
    fallback: (props) => {
        //return <Redirect to={url} />;

        localStorage.clear();
        props.history.push("/admin/login");
    },
}

export default UrlHelper;
