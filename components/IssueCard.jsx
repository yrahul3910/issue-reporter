import React from "react";
import PropTypes from "prop-types";

class IssueCard extends React.Component {
    constructor(props) {
        super(props);
    }

    async click() {
        const response = await fetch("/api/issues/complete", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                title: this.props.title,
                location: this.props.location,
                desc: this.props.desc
            })
        });

        const data = await response.json();
        if (data.success)
            this.props.toggleStatus(this.props.index);
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
                    <a onClick={this.click} className="waves-effect waves-teal btn-flat red-text">
                        Mark as completed
                    </a>
                </div>
            </div>
        );
    }
}

IssueCard.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    duplicates: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

export default IssueCard;
