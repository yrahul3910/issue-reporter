import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./Home.jsx";
import IssuePage from "./IssuePage.jsx";

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={ () =>
                    <Home />
                } />
                <Route path="/dashboard" render={() =>
                    <IssuePage />
                } />
            </Switch>
        );
    }
}

export default Main;
