import React, { Component } from 'react';
import { Grid, Menu, Segment, Comment, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ViewComments from "./ViewComments";
import ViewTrips from './ViewTrips';
import ViewPhoto from "./ViewPhoto";
import "../TripOverview.css";
import { Renderer } from 'leaflet';
import { render } from '@testing-library/react';

export default class MenuExampleTabularOnLeft extends Component {
  state = { activeItem: 'trip' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  viewSegment = (activeItem) => {
      if (activeItem === "trip") {
          return <>
            <ViewTrips />
          </>
      } else if (activeItem === "pictures") {
          return <>
            <ViewPhoto />
          </>
      } else if (activeItem === "items") {
          return "Item table"
      }else if (activeItem === "comments") {
          return <>
            <ViewComments />
          </>
      }
  };

  render() {
    const { activeItem } = this.state

    return (
      <div id="trip-main">
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
              name='items'
              active={activeItem === 'items'}
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
              {this.viewSegment(activeItem)}
          </Segment>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}