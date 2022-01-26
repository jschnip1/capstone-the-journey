import React, { useRef, useState, useEffect } from "react";
import Geocoder from "react-map-gl-geocoder";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import LocationItem from "./LocationItem";
import { Container, Divider } from "semantic-ui-react";
import { Button, Icon, List, Form } from "semantic-ui-react";
import AddLocationButton from "./AddLocationButton";
import LocationSearch from "./LocationSearch";

function LocationList({
  origin,
  destination,
  locationList,
  setLocationList,
  geocoderContainerRef,
  startTrip,
  geocoder3,
  setDestination,
  map,
}) {
  const [visiblity, setVisibility] = useState(true);
  const [waypoint, setWaypoint] = useState("");

  const handleAddLocation = () => {
    setVisibility(false);
  };

  geocoder3.on("result", (e) => {
    setDestination(e.result);
  });

  const handleDeleteLocation = () => {};

  useEffect(() => {
    if (document.getElementById("location-request")) {
      document
        .getElementById("location-request")
        .appendChild(geocoder3.onAdd(map));
    }
  }, [visiblity]);

  geocoder3.on("result", (e) => {
    setWaypoint(e.result);
    geocoder3.clear();
  });

  useEffect(() => {
    if (!visiblity) {
      locationList.push(waypoint);
    }
  }, [waypoint]);

  return (
    <Container text className="trip-planner-overview">
      <h1>Trip Overview</h1>
      <div id="addLocationControlBar">
        {origin && destination && startTrip ? (
          visiblity ? (
            <AddLocationButton handleAddLocation={handleAddLocation} />
          ) : (
            <div className="ui form">
              <div className="field add-location">
                <LocationSearch
                  geocoderContainerRef={geocoderContainerRef}
                  id="location-request"
                />
              </div>
            </div>
          )
        ) : (
          <AddLocationButton
            handleAddLocation={handleAddLocation}
            style={{ visibility: "hidden" }}
          />
        )}
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
