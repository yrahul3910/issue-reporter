import React from "react";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import PropTypes from "prop-types";

class IssuePage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3" style={{paddingLeft: "0", paddingRight: "0"}}>
                    <Sidebar name={this.props.user.name} 
                        toggleLogin={this.props.toggleLogin}
                        type={this.props.user.type} />
                </div>
                <div className="col-md-9" style={{paddingLeft: "0"}}>
                    <Dashboard user={this.props.user} />
                </div>
                {this.props.children}
            </div>
        );
    }
}

IssuePage.propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func.isRequired
}

export default IssuePage;
