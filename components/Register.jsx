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
        this.state = { message: "" };
        this.click = this.click.bind(this);

        this.username = React.createRef();
        this.password = React.createRef();
        this.resident = React.createRef();
        this.name = React.createRef();
    }

    async click() {
        let name = this.name.current.value;
        let username = this.username.current.value;
        let utype;
        if (this.resident.current.checked)
            utype = "user";
        else
            utype = "org";

        try {
            const response = await fetch("/api/user/signup", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password: this.password.current.value,
                    name,
                    type: utype
                })
            })

            const content = await response.json();
            this.props.toggleLogin({
                name,
                username,
                type: utype
            });

            localStorage.setItem("token", content.token);
            this.props.history.push("/dashboard");
        } catch (e) {
            this.setState({message: "Username already exists!"});
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
                    <div className="col s4 offset-s4">
                        <div id="message" style={{ color: "red" }}>{this.state.message}</div>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }} >
                    <form>
                        <div className="row">
                            <div className="input-field col s4 offset-s4">
                                <i className="material-icons prefix">face</i>
                                <input id="name" ref={this.name} type="text" className="validate" />
                                <label htmlFor="name">Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4 offset-s4">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="username" ref={this.username} type="text" className="validate" />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4 offset-s4">
                                <i className="material-icons prefix">lock_outline</i>
                                <input id="password" ref={this.password} type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s1 offset-s4">
                                <i className="material-icons prefix">account_balance</i>
                            </div>
                            <div className="input-field col s4">
                                <p>
                                    <label>
                                        <input name="group1" ref={this.resident} type="radio" checked />
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
                            <div className="col s4 offset-s4">
                                <a className="btn waves-effect waves-light" onClick={this.click}>SIGN UP</a>
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
