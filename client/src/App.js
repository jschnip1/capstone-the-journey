import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import AuthContext from "./AuthContext";
import NavBar from "./NavBar";
import Login from "./components/Login";
import TripPlanner from "./components/TripPlanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./NotFound";
import TripOverview from "./components/TripOverview";

function App() {

  const [user, setUser] = useState({ username: "" });

  const login = (token) => {

    const decodedToken = jwt_decode(token);

    const nextUser = { ...user };
    nextUser.username = decodedToken.sub;
    nextUser.roles = decodedToken.authorities.split(",");
    nextUser.token = token;
    nextUser.isAdmin = function() {
      return this.roles?.includes("ROLE_ADMIN");
    };

    setUser(nextUser);
  }

  const logout = () => {
    setUser({ username: "" });
  };

  const auth = {
    user,
    login,
    logout
  };

  return (
    <>
    <div>
      <AuthContext.Provider value={auth}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Login>Login</Login>
          </Route>
          <Route path="/register">
            <h1>Register</h1>
          </Route>
          <Route path="/about/us">
            <h1>About Us</h1>
          </Route>
          <Route path="/profile/:profileId">
            <h1>Profile</h1>
          </Route>
          <Route path="/adventure/planning">
            <TripPlanner></TripPlanner>
          </Route>
          <Route path="/travel/buddy/add">
            <h1>Add Travel Buddy</h1>
          </Route>
          <Route path="/trip/overview/:id">
            <TripOverview />
          </Route>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      </AuthContext.Provider>
      <ToastContainer />
    </div>
    </>
  );
}

export default App;
