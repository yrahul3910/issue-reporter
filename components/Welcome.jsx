import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class Welcome extends React.Component {
    /*
        props:
            name: A string, the name of the organization.
            issues: A number with the number of open issues.
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <div className="row">
                    <h1 style={{color: "teal"}} >Welcome,
                        <Link style={{color: "teal"}} to="/profile">
                            {" " + this.props.name}
                        </Link>
                    </h1>
                </div>
                <div>
                    <p>You have <b>{this.props.issues}</b> open issues. Go to the Issues page to see them.</p>
                </div>
            </div>
        );
    }
}

Welcome.propTypes = {
    name: PropTypes.string.isRequired,
    issues: PropTypes.number.isRequired
}

export default Welcome;
