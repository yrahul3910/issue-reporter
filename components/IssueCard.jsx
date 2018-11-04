import React from "react";
import PropTypes from "prop-types";

class IssueCard extends React.Component {
    /*
        title: The title of the issue
        location: The location of the issue.
        id: The issue ID (from MongoDB)
        duplicates: The number of duplicates
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="collection-item avatar">
                <span className="title">{this.props.title}</span>
                <p>{this.props.location} <br />
                    <span style={{color: "red"}}>{this.props.duplicates + " "}duplicate(s)</span>
                </p>
                <a href="#!" className="secondary-content"><i className="material-icons">arrow_forward</i></a>
            </li>
        );
    }
}

IssueCard.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    duplicates: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired
};

export default IssueCard;
