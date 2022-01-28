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
import { Reorder } from "framer-motion";

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
  setSaveTrip,
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
      .setLngLat(coordinateList[coordinateList.length - 1])
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
    const nextLocationList = [...locationList];
    nextLocationList.splice(locationList.length - 1, 0, e.result);
    const nextCoordinateList = [...coordinateList];
    nextCoordinateList.splice(
      coordinateList.length - 1,
      0,
      e.result.geometry.coordinates
    );
    setLocationList(nextLocationList);
    setCoordinateList(nextCoordinateList);
    //addWaypoints(e);
    geocoder3.clear();
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
      <Reorder.Group as="div" values={locationList} onReorder={setLocationList}>
        {locationList.map((item, index) => (
          <Reorder.Item key={item.id} value={item.text}>
            <LocationItem
              key={item.id}
              location={item}
              onAddLocation={handleAddLocation}
              onDeleteLocation={handleDeleteLocation}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </Container>
  );
}

export default LocationList;

//<List animated verticalAlign="top" className="tripRoute">
