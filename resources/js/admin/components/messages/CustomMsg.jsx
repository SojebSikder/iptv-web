import React from 'react'

export const CustomError = (props) => {
    return (
        <div>
            <div className="alert alert-danger">{props.msg}</div>
        </div>
    )
}
export const CustomSuccess = (props) => {
    return (
        <div>
            <div className="alert alert-success">{props.msg}</div>
        </div>
    )
}
