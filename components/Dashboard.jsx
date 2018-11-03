import React from "react";
import IssueCard from "./IssueCard.jsx";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
    /*
        props:
            issues: Array of all the issues, pulled from the DB
    */
    constructor(props) {
        super(props);
        this.state = { issues: [] }
    }

    componentDidMount() {
        (async () => {
            const response = await fetch("/api/issues/filter", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    threshold: 0.6
                })
            });

            const issues = await response.json();
            this.setState({ issues });
        })();
    }

    render() {
        let issues = this.state.issues.map((issues, i) => { 
            let issue = issues.issue;
            <IssueCard key={i}
                    title={issue.title}
                    location={issue.location}
                    desc={issue.desc}
                    id={i.toString()}
                    duplicates={issues.duplicates} />
        });
        return (
            <div>
                <div className="row">
                    <div className="center">
                        <h2>Issues</h2>
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
        );
    }
}

Dashboard.propTypes = {
    issues: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

export default Dashboard;
