import React from "react";
import PropTypes from "prop-types";

class IssueCard extends React.Component {
    /*
        title: The title of the issue
        location: The location of the issue.
        duplicates: The number of duplicates
    */
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
                    <p style={{color: "red"}}>{this.props.duplicates + " duplicates"}</p>
                </div>
                <div className="card-reveal">
                    <span className="card-title activator grey-text text-darken-4">
                        {this.props.title}
                        <i className="material-icons right">close</i>
                    </span>
                    <p>{this.props.location}</p>
                    <p>{this.props.desc}</p>
                </div>
            </div>
        );
    }
}

IssueCard.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    duplicates: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired
};

export default IssueCard;
