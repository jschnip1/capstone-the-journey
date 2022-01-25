import React, { Component } from 'react';
import { Grid, Menu, Segment, Comment, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ViewComments from "./ViewComments";
import ViewTrips from './ViewTrips';
import ViewPhoto from "./ViewPhoto";
import ItemTable from './itemComponents/ItemTable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { fetchById } from '../services/TripApi';

export default function MenuExampleTabularOnLeft() {
  
    const [activeItem, setActiveItem] = useState('trip');
    const [trip, setTrip] = useState({
      tripId: 0,
      startTime: "",
      endTime: "",
      tripReview: 0,
      totalDistance: 0,
      name: "",
      disable: false,
      itemList: [],
      commentList: [],
      location: []
    })


  const handleItemClick = (e, { name }) => { setActiveItem(name)}

  const viewSegment = (activeItem) => {
    if (activeItem === "trip") {
      return <>
        <ViewTrips />
      </>
    } else if (activeItem === "pictures") {
      return <>
        <ViewPhoto />
      </>
    } else if (activeItem === "items") {
      return <>
        <ItemTable items={trip.itemList} />
      </>
    } else if (activeItem === "comments") {
      return <>
        <ViewComments />
      </>
    }
  };

  const { tripId } = useParams();

  useEffect(() => {
    fetchById(tripId)
      .then(setTrip)
      .catch(console.log)
  }, [tripId])

  return (
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item
            name='trip'
            active={activeItem === 'trip'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='pictures'
            active={activeItem === 'pictures'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='items'
            active={activeItem === 'items'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='comments'
            active={activeItem === 'comments'}
            onClick={handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Segment>
          {viewSegment(activeItem)}
        </Segment>
      </Grid.Column>
    </Grid>
  )

}