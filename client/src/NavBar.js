import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function NavBar() {
  // const state = { activeItem: 'home' }

  // const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  //   const { activeItem } = this.state

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
        </Menu.Menu>
      </Menu>
    )
}

export default NavBar;