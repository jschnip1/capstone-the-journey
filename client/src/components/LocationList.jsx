import React, { useRef, useState, useEffect } from "react";
import Geocoder from "react-map-gl-geocoder";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import LocationItem from "./LocationItem";
import { Container, Divider } from "semantic-ui-react";
import { Button, Icon, List } from "semantic-ui-react";

function LocationList({
  origin,
  destination,
  locationList,
  setLocationList,
  startTrip,
}) {
  let e = React.createElement;
  const handleAddLocation = () => {};

  const handleDeleteLocation = () => {
  };

  useEffect(() => {
    function handleStartTrip() {
      locationList.push(origin);
      locationList.push(destination);
    }
    if (origin && destination) {
      handleStartTrip();
    }
  }, [startTrip]);

  return (
    <Container text className="trip-planner-overview">
      <h1>Trip Overview</h1>
      <div id="addLocationControlBar">
        
      </div>
      <Divider />
      <List animated verticalAlign="top" className="tripRoute">
        {locationList.map((item, index) => (
          <LocationItem
            key={index}
            location={item}
            onAddLocation={handleAddLocation}
            onDeleteLocation={handleDeleteLocation}
          />
        ))}
      </List>
    </Container>
  );
}

export default LocationList;
