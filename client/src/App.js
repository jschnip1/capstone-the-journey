import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import './App.css';
import AuthContext from "./AuthContext";
import NavBar from "./NavBar";

function App() {
  return (
    <>
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
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
            <h1>Adventure Planning</h1>
          </Route>
          <Route path="/travel/buddy/add">
            <h1>Add Travel Buddy</h1>
          </Route>
          <Route path="/trip/overview">
            <h1>Trip Overview</h1>
          </Route>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;
