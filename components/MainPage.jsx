import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Banner from "./Banner.jsx";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                const response = await fetch("/api/user/whoami", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token
                    })
                });
                const data = await response.json();
                const { user } = data;

                this.props.toggleLogin(user);
                this.props.history.push("/dashboard");
            })();
        }
    }

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

MainPage.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default MainPage;
