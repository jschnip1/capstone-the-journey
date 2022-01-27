import React, { Component } from 'react';
import { Grid, Menu, Segment, Comment, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ViewComments from "../CommentComponents/ViewComments";
import ViewTrips from '../TripComponents/ViewTrips';
import ViewPhoto from "../PhotoComponents/ViewPhoto";
import ItemTable from '../itemComponents/ItemTable';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react/cjs/react.development';
import { fetchById } from '../../services/TripApi';
import { Renderer } from 'leaflet';
import { render } from '@testing-library/react';
import AuthContext from "../../AuthContext";
import PhotoForm from "../PhotoComponents/PhotoForm";


export default function MenuExampleTabularOnLeft() {

   // TODO: ternary operator to make sure only person associated with trip can upload photo

   const auth = useContext(AuthContext);
  
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
      locations: []
    })

    const onAddPhoto = (photo) => {
        trip.locations[photo.tripLocationId - 1].photoList.push(photo);
    };

  const handleItemClick = (e, { name }) => { setActiveItem(name)}

  const viewSegment = (activeItem) => {
    if (activeItem === "trip") {
      return <>
        <ViewTrips />
      </>
    } else if (activeItem === "pictures") {
      return <>
        <ViewPhoto locations={trip.locations} />
      </>
    } else if (activeItem === "items") {
      return <>
        <ItemTable items={trip.itemList} />
      </>
    } else if (activeItem === "comments") {
      return <>
        <ViewComments comments={trip.commentList} />
      </>
    } else if (activeItem === "upload photo") {
      return <>
        <PhotoForm locations={trip.locations} onAddPhoto={onAddPhoto} />
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
    <div id="trip-main">
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
          <Menu.Item
            name='upload photo'
            active={activeItem === 'upload photo'}
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
    </div>
  )
}