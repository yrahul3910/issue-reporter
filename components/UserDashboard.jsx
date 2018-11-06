import React from "react";
import PropTypes from "prop-types";

import UserIssueCard from "./UserIssueCard.jsx";
import Sidebar from "./Sidebar.jsx";

class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] }
    }

    async componentDidMount() {
        const response = await fetch("/api/user/issues", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            })
        });

        const data = await response.json();
        this.setState({ issues: data.issues });
    }

    render() {
        let issues = this.state.issues ?
            this.state.issues.map((issues, i) => {
                let issue = issues.issue;
                return <UserIssueCard key={i}
                    title={issue.title}
                    location={issue.location}
                    desc={issue.desc}
                    status={issues.status} />;
            }) : <div></div>;
        return (
            <div className="row">
                <div className="col-md-3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <Sidebar name={this.props.user.name} toggleLogin={this.props.toggleLogin} />
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="center">
                            <h2>Your issues</h2>
                        </div>
                    </div>
                    <div>
                        <div>
                            <ul className="collection">
                                {issues}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserDashboard.propTypes = {
    user: PropTypes.object.isRequired,
    toggleLogin: PropTypes.func.isRequired
};

export default UserDashboard;
