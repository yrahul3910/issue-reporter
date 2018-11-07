import React from "react";
import PropTypes from "prop-types";

class UserIssueCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        {this.props.title}
                    </span>
                    <p className={this.props.status}><b>{this.props.status}</b></p>
                </div>
                <div className="card-reveal">
                    <span className="card-title activator grey-text text-darken-4">
                        {this.props.title}
                        <i className="material-icons right">close</i>
                    </span>
                    <p>{this.props.location}</p>
                    <p>Status: <b>{" " + this.props.status}</b></p>
                    <p>Organization: <b>{" " + this.props.org}</b></p>
                    <p>{this.props.desc}</p>
                </div>
            </div>
        );
    }
}

UserIssueCard.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    org: PropTypes.string.isRequired
};

export default UserIssueCard;