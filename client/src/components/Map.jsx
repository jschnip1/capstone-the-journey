import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "../styling/TripPlanner.css";
import LocationList from "./LocationList";
import LocationSearch from "./LocationSearch";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { Button, Icon } from "semantic-ui-react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Map() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

  const geocoderContainerRef = useRef(null);
  const [startTrip, setStartTrip] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(
    window.localStorage.getItem("current-location-lng") === null
      ? -77.037
      : window.localStorage.getItem("current-location-lng")
  );
  const [lat, setLat] = useState(
    window.localStorage.getItem("current-location-lat") === null
      ? 38.895
      : window.localStorage.getItem("current-location-lat")
  );
  const [zoom, setZoom] = useState(
    window.localStorage.getItem("current-location-zoom") === null
      ? 16
      : window.localStorage.getItem("current-location-zoom")
  );

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    //types: "country,region,place,postcode,locality,neighborhood",
    render: function (item) {
      return `<div class='geocoder-dropdown-item'>
      <span class='geocoder-dropdown-text'>
      ${item.text}
      ${item.context[1].text}, ${item.context[2].text}
      </span>
      </div>`;
    },
  });

  const geocoder2 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });

  const geocoder3 = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/yellow-ranger/ckyolpbst29pe15pq1cniobi5",
        center: [lng, lat],
        zoom: zoom,
        pitch: 75,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
      map.addControl(geocoder);
      map.addControl(geocoder2);
      map.addControl(geocoder3);
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      window.localStorage.setItem("current-location-lat", lat);
      window.localStorage.setItem("current-location-lng", lng);
      window.localStorage.setItem("current-location-zoom", zoom);
    });
  });

  useEffect(() => {
    document.getElementById("origin-request").appendChild(geocoder.onAdd(map));
    document
      .getElementById("destination-request")
      .appendChild(geocoder2.onAdd(map));
  }, []);

  const handleStartTrip = (e) => {
    e.preventDefault();
    locationList.push(origin);
    locationList.push(destination);
    setStartTrip(true);
  };

  geocoder.on("result", (e) => {
    setOrigin(e.result);
  });

  geocoder2.on("result", (e) => {
    setDestination(e.result);
  });

  return (
    <div className="main">
      <form
        className="ui form origin-destination-inline-block"
        onSubmit={handleStartTrip}
      >
        <div className="two-fields">
          <div className="fields origin-destination-fields">
            <div className="field">
              <label id="starting-location-label">Starting Location</label>
              <LocationSearch
                geocoderContainerRef={geocoderContainerRef}
                id="origin-request"
              />
            </div>
            <div className="field">
              <label id="destination-label">Destination</label>
              <LocationSearch
                geocoderContainerRef={geocoderContainerRef}
                id="destination-request"
              />
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button className="startTripButton" animated type="submit">
            <Button.Content visible>Plan Trip</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow circle right" />
            </Button.Content>
          </Button>
        </div>
      </form>
      <LocationList
        origin={origin}
        destination={destination}
        locationList={locationList}
        setLocationList={setLocationList}
        geocoderContainerRef={geocoderContainerRef}
        startTrip={startTrip}
        geocoder3={geocoder3}
        setDestination={setDestination}
        map={map}
      />
      <pre id="origin-result json-result"></pre>
      <pre id="destination-result json-result"></pre>
      <div ref={mapContainer} className="mapContainer" id="map" />
    </div>
  );
}

export default Map;
