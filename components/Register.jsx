/* eslint no-undef:0 */
import React from "react";
import PropTypes from "prop-types";

class Register extends React.Component {
    /*
        props:
            toggleLogin: Function that is called when user is done registering
    */
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click() {
        let name = $("#name").val();
        let username = $("#username").val();
        $.post("http://localhost:5000/api/signup", {
            username,
            password: $("#password").val(),
            name,
            type: "org"
        }, (data) => {               
            $("#message").html("<span style='color: green'>Success!</span>");
            this.props.toggleLogin({
                name,
                username
            });

            localStorage.setItem("token", data.token);
        }).fail(res => {
            $("#message").html("<span style='color: red'>Username already exists!</span>");
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
                                <i className="material-icons prefix">face</i>
                                <input id="name" type="text" className="validate" />
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
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
                            <div className="col-md-4 col-md-offset-4">
                                <a className="btn waves-effect waves-light">SIGN UP</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default Register;
