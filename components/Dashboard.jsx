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
    }

    render() {
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
                            <IssueCard title="This is a sample issue."
                                location="JP Nagar"
                                id="1"
                                duplicates={2} />
                            <IssueCard title="This is another issue."
                                location="Kaggadasapura"
                                id="2"
                                duplicates={4} />
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    issues: PropTypes.array.isRequired
};

export default Dashboard;
