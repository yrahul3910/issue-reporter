import React from "react";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";

class IssuePage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3" style={{paddingLeft: "0", paddingRight: "0"}}>
                    <Sidebar name="Gugu, Inc." dp="https://d1wn0q81ehzw6k.cloudfront.net/additional/thul/media/0eaa14d11e8930f5?w=400&h=400" />
                </div>
                <div className="col-md-9" style={{paddingLeft: "0"}}>
                    <Dashboard />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default IssuePage;
