import React from "react";
import {Switch, Route} from "react-router-dom";

import MainPage from "./MainPage.jsx";
import IssuePage from "./IssuePage.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={ () =>
                    <MainPage />
                } />
                <Route exact path="/dashboard" render={() =>
                    <IssuePage />
                } />
                <Route exact path="/login" render={() =>
                    <Login />
                } />
                <Route exact path="/register" render={() =>
                    <Register />
                } />
            </Switch>
        );
    }
}

export default Main;
