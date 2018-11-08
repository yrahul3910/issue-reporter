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
        this.state = {message: ""};
        this.click = this.click.bind(this);

        this.username = React.createRef();
        this.password = React.createRef();
        this.resident = React.createRef();
    }

    async click() {
        let utype;
        let username = this.username.current.value;
        if (this.resident.current.checked)
            utype = "user";
        else
            utype = "org";

        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password: this.password.current.value,
                    type: utype
                })
            })

            const content = await response.json();

            if (content.success) {
                this.props.toggleLogin({
                    name,
                    username,
                    type: utype
                });

                localStorage.setItem("token", content.token);

                if (utype == "org")
                    this.props.history.push("/dashboard");
                else
                    this.props.history.push("/user");
            } else
                this.setState({message: "Authentication failed."});
        } catch (e) {
            this.setState({message: "Authentication failed."});
        }
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
                        <div id="message" style={{color: "red"}}>{this.state.message}</div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }} >
                    <form>
                        <div className="row">
                            <div className="input-field col-md-4 col-md-offset-4">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="username" ref={this.username} type="text" className="validate" />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-md-4 col-md-offset-4">
                                <i className="material-icons prefix">lock_outline</i>
                                <input id="password" ref={this.password} type="password" className="validate" />
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
                                        <input name="group1" ref={this.resident} type="radio" defaultChecked />
                                        <span>Resident/Citizen</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="group1" type="radio" />
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
