import React, { useContext } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link, useHistory } from "react-router-dom";

import AuthContext from "./AuthContext"


function NavBar() {
  // const state = { activeItem: 'home' }

  // const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  //   const { activeItem } = this.state

  const auth = useContext(AuthContext);
  const history = useHistory();

  function logoutAuth() {
    auth.logout();
    history.push("/")
  }

  return (
    <Menu secondary>
      <Menu.Item
        name='home'
        // active={activeItem === 'home'}
        // onClick={this.handleItemClick}
        as={Link}
        to="/"
        className='navbar-links'
      />
      <Menu.Item
        name='plan trip'
        // active={activeItem === 'plan trip'}
        // onClick={this.handleItemClick}
        as={Link}
        to="/adventure/planning"
        className='navbar-links'
      />
      <Menu.Item
        name='profile'
        // active={activeItem === 'profile'}
        // onClick={this.handleItemClick}
        as={Link}
        to="/profile/:id"
        className='navbar-links'
      />
      <Menu.Menu position='right'>
        {auth.user.username !== "" ? (
          <>
            <Menu.Item
              content={`Hello ${!auth.profile.name ? auth.user.username : auth.profile.name}!`}
            />
            <Menu.Item
              name='Logout'
              onClick={logoutAuth}
            />
          </>
        ) : (
          <>
            <Menu.Item
              name='login'
              // active={activeItem === 'login'}
              // onClick={this.handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='register'
              // active={activeItem === 'register'}
              // onClick={this.handleItemClick}
              as={Link}
              to="/register"
            />
          </>)}
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar;