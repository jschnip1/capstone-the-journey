import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
        />
        <Menu.Item
                name='plan trip'
                active={activeItem === 'plan trip'}
                onClick={this.handleItemClick}
                as={Link}
                to="/adventure/planning"
        />
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
          as={Link}
          to="/profile/:id"
        />
        <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
                as={Link}
                to="/register"
            />
        </Menu.Menu>
      </Menu>
    )
  }
}