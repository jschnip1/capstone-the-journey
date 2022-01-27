import React, { useRef, useState, useEffect } from "react";
import Geocoder from "react-map-gl-geocoder";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import LocationItem from "./LocationItem";
import { Container, Divider } from "semantic-ui-react";
import { Button, Icon, List, Form } from "semantic-ui-react";
import LocationButton from "./LocationButton";
import LocationSearch from "./LocationSearch";
import mapboxgl from "mapbox-gl";

function LocationList({
  origin,
  destination,
  coordinateList,
  locationList,
  setLocationList,
  setCoordinateList,
  geocoderContainerRef,
  startTrip,
  geocoder3,
  setDestination,
  fetchTripRoute,
  map,
  setSaveTrip
}) {
  const [visiblity, setVisibility] = useState(true);

  const handleAddLocation = () => {
    setVisibility(false);
  };

  const handleSaveTrip = () => {
    setSaveTrip(true);
  };

  const handleStopSearch = async () => {
    setVisibility(true);
    await fetchTripRoute(coordinateList);
    const marker = new mapboxgl.Marker()
      .setLngLat(coordinateList.pop())
      .addTo(map);
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

  geocoder3.on("result", async (e) => {
    const nextLocationList = [...locationList, e.result];
    const nextCoordinateList = [
      ...coordinateList,
      e.result.geometry.coordinates,
    ];
    setLocationList(nextLocationList);
    setCoordinateList(nextCoordinateList);
    geocoder3.clear();
    console.log(locationList);
  });

  return (
    <Container text className="trip-planner-overview">
      <h1>Trip Overview</h1>
      <div id="addLocationControlBar">
        {visiblity ? (
          <div className="ui form">
            <div className="two-fields">
              <div className="fields">
                <div className="field control-bar-button">
                  <LocationButton
                    compact
                    handleClick={handleAddLocation}
                    iconName="plus circle"
                    actionText="Add Location"
                    classNameProp={"addLocation-button"}
                  />
                </div>
                <div className="field control-bar-button">
                  <LocationButton
                    compact
                    handleClick={handleSaveTrip}
                    iconName="car"
                    actionText="Save Trip"
                    classNameProp={"saveTrip-button"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ui form">
            <div className="two-fields">
              <div className="fields search-field">
                <div className="field add-location">
                  <LocationSearch
                    geocoderContainerRef={geocoderContainerRef}
                    id="location-request"
                  />
                </div>
                <div className="field control-bar-button exit-search">
                  <LocationButton
                    compact
                    handleClick={handleStopSearch}
                    iconName="stop"
                    actionText="Exit Search"
                    classNameProp={"stopSearch-button"}
                  />
                </div>
              </div>
            </div>
          </div>
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
