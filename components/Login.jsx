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
        let type = $("#type").val();
        let utype;
        if (type == "Resident/Citizen")
            utype = "user";
        else
            utype = "org";
        $.post("http://localhost:5000/api/user/login", {
            username: $("#username").val(),
            password: $("#password").val(),
            type: utype
        }).done(data => {              
            $("#message").html("<span style='color: green'>Success</span>");

            localStorage.setItem("token", data.token);
            this.props.toggleLogin(data.user);
        }).fail(response => {
            $("#message").html("<span style='color: red'>Authentication failed</span>");
        });
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{backgroundColor: "teal"}} >
                        <a href="#" className="brand-logo left-shift">Issue Reporter</a>
                    </div>
                </nav>
                <div className="row" style={{marginTop: "40px"}}>
                    <div id="message"></div>
                </div>
                <div className="row" style={{marginTop: "10px"}} >
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
                            <div className="input-field col-md-4 col-md-offset-4">
                                <i className="material-icons prefix">account_balance</i>
                                <select id="type" placeholder="I am a...">
                                    <option>Resident/Citizen</option>
                                    <option>Government</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <a className="btn waves-effect waves-light">LOG IN</a>
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
