import React from 'react'
import PropTypes from 'prop-types';

function Alert(props) {
    return (
        <div className="alert alert-info" role="alert">
            {props.message}
        </div>
    )
}

Alert.Prototype = {
    message: PropTypes.string
}

Alert.defaultProps = {
    message: "No message to show !!:("
}

export default Alert