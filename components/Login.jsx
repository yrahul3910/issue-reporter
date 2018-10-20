/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";

class Login extends React.Component {
    /*
        props:
            toggleLogin: Function called when user logs in
    */
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        let utype;
        let username = $("#username").val();
        if ($("#res").checked)
            utype = "user";
        else
            utype = "org";

        (async () => {
            try {
                const response = await fetch("/api/user/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password: $("#password").val(),
                        type: utype
                    })
                })

                const content = await response.json();
                $("#message").html("<span style='color: green'>Success!</span>");
                this.props.toggleLogin({
                    name,
                    username,
                    type: utype
                });

                localStorage.setItem("token", content.token);
                this.props.history.push("/dashboard");
            } catch (e) {
                $("#message").html("<span style='color: red'>Authentication failed.</span>");
            }
        })();
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{ backgroundColor: "teal" }} >
                        <a href="#" className="brand-logo left-shift">Issue Reporter</a>
                    </div>
                </nav>
                <div className="row" style={{ marginTop: "40px" }}>
                    <div className="col-md-4 col-md-offset-4">
                        <div id="message"></div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }} >
                    <form>
                        <div className="row">
                            <div className="input-field col-md-4 col-md-offset-4">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="username" type="text" className="validate" />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-md-4 col-md-offset-4">
                                <i className="material-icons prefix">lock_outline</i>
                                <input id="password" type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-md-1 col-md-offset-4">
                                <i className="material-icons prefix">account_balance</i>
                            </div>
                            <div className="input-field col-md-4">
                                <p>
                                    <label>
                                        <input name="group1" id="res" type="radio" checked />
                                        <span>Resident/Citizen</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group1" id="org" type="radio" />
                                        <span>Organization</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <a className="btn waves-effect waves-light" onClick={this.click}>LOG IN</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    toggleLogin: PropTypes.func.isRequired
}

export default Login;
