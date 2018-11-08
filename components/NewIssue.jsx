import React from "react";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar.jsx";

class NewIssue extends React.Component {
    constructor(props) {
        super(props);
        this.title = React.createRef();
        this.org = React.createRef();
        this.location = React.createRef();
        this.desc = React.createRef();
        this.click = this.click.bind(this);
    }

    async click() {
        const response = await fetch("/api/issues/new", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                title: this.title.current.value,
                org: this.org.current.value,
                desc: this.desc.current.value,
                location: this.location.current.value
            })
        });

        let data = await response.json();
        if (data.success)
            this.props.history.push("/user");
    }

    render() {
        return (
            <div className="row">
                <div className="col s3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <Sidebar name={this.props.user.name}
                        toggleLogin={this.props.toggleLogin}
                        type={this.props.user.type} />
                </div>
                <div className="col s9">
                    <div className="row" style={{ marginTop: "10px" }} >
                        <form>
                            <div className="row">
                                <div className="input-field col s4 offset-s4">
                                    <input id="title" ref={this.title} type="text" className="validate" />
                                    <label htmlFor="title">Title</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4 offset-s4">
                                    <input id="org" ref={this.org} type="text" className="validate" />
                                    <label htmlFor="org">Organization</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4 offset-s4">
                                    <input id="location" ref={this.location} type="text" className="validate" />
                                    <label htmlFor="location">Location</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s4 offset-s4">
                                    <textarea id="desc" ref={this.desc} className="materialize-textarea"></textarea>
                                    <label htmlFor="desc">Descriptions</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s4 offset-s4">
                                    <a className="btn waves-effect waves-light" onClick={this.click}>Create Issue</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NewIssue.propTypes = {
    user: PropTypes.object.isRequired,
    toggleLogin: PropTypes.func.isRequired
};

export default NewIssue;