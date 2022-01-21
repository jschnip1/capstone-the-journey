import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='trip'
              active={activeItem === 'trip'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='pictures'
              active={activeItem === 'pictures'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='comments'
              active={activeItem === 'comments'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            Content
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}