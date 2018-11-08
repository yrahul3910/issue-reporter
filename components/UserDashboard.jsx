import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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
            this.state.issues.map((issue, i) => {
                return <UserIssueCard key={i}
                    title={issue.title}
                    location={issue.location}
                    desc={issue.desc}
                    status={issue.status}
                    org={issue.org} />;
            }) : <div></div>;
        return (
            <div className="row">
                <div className="col s3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <Sidebar name={this.props.user.name} 
                        toggleLogin={this.props.toggleLogin}
                        type={this.props.user.type} />
                </div>
                <div className="col s9">
                    <div className="row">
                        <div className="center">
                            <h2>Your issues</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center">
                            <Link to="/issue/new" className="waves-effect waves-teal btn-flat">
                                Add new issue
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div>
                            <ul>
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
