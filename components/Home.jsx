import React from "react";
import Sidebar from "./Sidebar.jsx";
import Welcome from "./Welcome.jsx";

class Home extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3" style={{paddingLeft: "0", paddingRight: "0"}}>
                    <Sidebar name="Gugu, Inc." />
                </div>
                <div className="col-md-9" style={{paddingLeft: "0"}}>
                    <Welcome name="gugu" issues={4} />
                </div>
            </div>
        );
    }
}

export default Home;
