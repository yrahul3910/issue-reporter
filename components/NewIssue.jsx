import React from "react";
import PropTypes from "prop-types";

class NewIssue extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

NewIssue.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default NewIssue;