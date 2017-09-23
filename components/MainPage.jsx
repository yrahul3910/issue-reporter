import React from "react";
import {Link} from "react-router-dom";
import Banner from "./Banner.jsx";

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <Banner />
                <div className="left-shift">
                    <h2 style={{color: "#404040"}}>Get started today. It&apos;s free, forever.</h2>
                </div>
                <div className="center">
                    <Link to="/login" className="btn waves-effect waves-light white-text" style={{marginRight: "40px"}} >
                        LOG IN
                    </Link>
                    <Link to="/register" className="btn waves-effect waves-light white-text" >
                        SIGN UP
                    </Link>
                </div>
            </div>
        );
    }
}

export default MainPage;
