import React, { useEffect } from "react";
import Config from "../../../admin/config/app";

export default function Index(props) {
    useEffect(() => {
        //props.history.push("http://www.facebook.com");
        window.location.href = Config.getAppPlayStoreLink();
    }, []);
    return (
        <div>
            <a href={Config.getAppPlayStoreLink()}>
                If not redirect link autometically then click here.
            </a>
        </div>
    );
}
