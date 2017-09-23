import React from "react";
import PropTypes from "prop-types";
require("../src/index.css");

class Sidebar extends React.Component {
    /*
        props:
            dp: A base64 encoding of an image.
            name: The organization's name.
    */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="side-nav fixed teal white-text center" style={{transform: "translateX(0%)"}}>
                <li style={{paddingTop: "20px"}}>
                    <img src={this.props.dp} style={{width: "100px", height: "100px"}} className="round" />
                </li>
                <li>
                    <h5>{this.props.name}</h5>
                </li>
                <li style={{paddingTop: "50px"}}>
                    <a href="#" className="white-text">
                        <i className="white-text material-icons">home</i>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="white-text">
                        <i className="white-text material-icons">person</i>
                        Profile
                    </a>
                </li>
                <li>
                    <a href="#" className="white-text">
                        <i className="material-icons white-text">priority_high</i>
                        Issues
                    </a>
                </li>
                <li style={{paddingTop: "50px"}} >
                    <a href="#" className="white-text">
                        <i className="material-icons white-text">exit_to_app</i>
                        Log Out
                    </a>
                </li>
            </ul>
        );
    }
}

Sidebar.propTypes = {
    dp: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
export default Sidebar;
