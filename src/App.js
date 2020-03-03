import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import HomeTwo from "./components/pages/HomeTwo";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import InstanceState from "./context/instance/InstanceState";

import "./App.css";

const App = () => {
  return (
    <AuthState>
      <InstanceState>
        <ContactState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/server" component={HomeTwo} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ContactState>
      </InstanceState>
    </AuthState>
  );
};

export default App;
