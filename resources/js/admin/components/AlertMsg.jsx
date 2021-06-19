import React from 'react';

export default function AlertMsg(props) {

    return (
        <div>

            <div className={"alert alert-"+props.type +" alert-dismissible fade show"} role="alert">
                {props.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>
            </div>

        </div>
    );
}
