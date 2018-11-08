import React from "react";
import IssueCard from "./IssueCard.jsx";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { issues: [] }
        this.updateThreshold = this.updateThreshold.bind(this);
        this.threshold = React.createRef();
    }

    async componentDidMount() {
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

        const data = await response.json();
        this.setState({ issues: data.filtered });
    }

    async updateThreshold() {
        const response = await fetch("/api/issues/filter", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                threshold: this.threshold.current.value / 100
            })
        });

        const data = await response.json();
        this.setState({ issues: data.filtered });
    }

    render() {
        let issues = this.state.issues ? 
            this.state.issues.map((issues, i) => {
                let issue = issues.issue;
                return <IssueCard key={i}
                    title={issue.title}
                    location={issue.location}
                    desc={issue.desc}
                    duplicates={issues.duplicates} />;
            }) : <div></div>;
        return (
            <div>
                <div className="row">
                    <div className="center">
                        <h2>Issues</h2>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <span className="input-field" style={{ marginRight: "10px" }}>
                                <input type="number" ref={this.threshold} className="validate"
                                placeholder="Similarity%" />
                            </span>
                            <a className="waves-effect waves-teal btn-flat" onClick={this.updateThreshold}>
                                Set threshold
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    {issues}
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

export default Dashboard;
