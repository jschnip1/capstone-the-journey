import React, { Component, useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function NavBar() {

    return (
      <Menu secondary>
        <Menu.Item
            name='home'
            as={Link}
            to="/"
            className='navbar-links'
        />
        <Menu.Item
                name='plan trip'
                as={Link}
                to="/adventure/planning"
                className='navbar-links'
        />
        <Menu.Item
          name='profile'
          as={Link}
          to="/profile"
          className='navbar-links'
        />
        <Menu.Menu position='right'>
          <Menu.Item
                name='login'
                as={Link}
                to="/login"
            />
          <Menu.Item
                name='register'
                as={Link}
                to="/register"
            />
        </Menu.Menu>
      </Menu>
    )
}

export default NavBar;