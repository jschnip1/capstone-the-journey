import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import { getProfileByUsername } from "./services/profileApi";
import './App.css';
import AuthContext from "./AuthContext";
import NavBar from "./NavBar";
import Login from "./components/Login";
import NotFound from "./NotFound";
import TripOverview from "./components/TripOverview";
import Register from "./components/Register";
import ProfileForm from "./components/profileComponents/profileForm";
import ProfileView from "./components/profileComponents/profileView";

function App() {

  const [user, setUser] = useState({ username: "" });
  const [profile, setProfile] = useState({ profileId: 0, profilePhoto: "", profileDescription: "", name: "", userId: 0, tripList: [] })

  const login = (token) => {

    const decodedToken = jwt_decode(token);

    const nextUser = { ...user };
    nextUser.username = decodedToken.sub;
    nextUser.roles = decodedToken.authorities.split(",");
    nextUser.token = token;
    nextUser.isAdmin = function () {
      return this.roles?.includes("ROLE_ADMIN");
    };

    setUser(nextUser);
    getProfileByUsername(nextUser.username)
      .then(setProfile)
      .catch(console.log)
  }

  const logout = () => {
    setUser({ username: "" });
  };

  const auth = {
    user,
    profile,
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
                <Register />
              </Route>
              <Route path="/about/us">
                <h1>About Us</h1>
              </Route>
              <Route path="/profile">
                <ProfileView />
              </Route>
              <Route path="/create/profile">
                <ProfileForm />
              </Route>
              <Route path="/adventure/planning">
                <h1>Adventure Planning</h1>
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
      </div>
    </>
  );
}

export default App;
