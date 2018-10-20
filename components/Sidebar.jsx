import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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
            <ul className="sidenav fixed teal white-text center" style={{width: "100%", height: "100vh"}}>
                <li style={{paddingTop: "20px"}}>
                    <img src={this.props.dp} style={{width: "100px", height: "100px"}} className="round" />
                </li>
                <li>
                    <h5>{this.props.name}</h5>
                </li>
                <li style={{paddingTop: "50px"}}>
                    <Link to="/" className="white-text">
                        <i className="white-text material-icons">home</i>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="white-text">
                        <i className="white-text material-icons">person</i>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="white-text">
                        <i className="material-icons white-text">priority_high</i>
                        Issues
                    </Link>
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
