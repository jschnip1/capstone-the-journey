/* eslint import/no-webpack-loader-syntax: off */


import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "!mapbox-gl";
import * as turf from "@turf/turf";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "../styling/TripPlanner.css";
import LocationList from "./LocationList";
import LocationSearch from "./LocationSearch";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { Button, Icon } from "semantic-ui-react";
import TripCreationForm from "./TripCreationForm";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { toast } from "react-toastify";

function Map() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

  const [saveTrip, setSaveTrip] = useState(false);
  const nullList = turf.featureCollection([]);
  const [coordinateList, setCoordinateList] = useState([]);
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

  const marker = new mapboxgl.Marker();

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

        map.addLayer({
          id: "trip-location-symbol",
          type: "symbol",
          source: {
            data: coordinateList,
            type: "geojson",
          },
          layout: {
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "icon-image": marker,
          },
        });

        map.addSource("route", {
          type: "geojson",
          data: nullList,
        });

        map.addLayer(
          {
            id: "routeline-active",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                3,
                22,
                12,
              ],
            },
          },
          "waterway-label"
        );

        //await map.on("click", addWaypoints);
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

  function assembleQueryURL(coordinateList) {
    const coordinateString = coordinateList.map((c) => c.join(",")).join(";");

    return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinateString}?overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken}`;
  }

  const handleStartTrip = async (e) => {
    e.preventDefault();
    setStartTrip(true);
    const nextLocationList = [...locationList, origin, destination];
    setLocationList(nextLocationList);
    const nextCoordinateList = [
      ...coordinateList,
      origin.geometry.coordinates,
      destination.geometry.coordinates,
    ];
    setCoordinateList(nextCoordinateList);
    await fetchTripRoute(nextCoordinateList);
    toast.info("Starting Trip!");
  };

  const fetchTripRoute = async (coordinateList) => {
    const initialResponse = await fetch(assembleQueryURL(coordinateList));
    const response = await initialResponse.json();

    if (response.code !== "Ok") {
      const handleMessage =
        response.code === "InvalidInput"
          ? "Refresh to start a new route"
          : "Try a different point.";
      coordinateList.features.pop();
      return;
    }

    const routeGeoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: response.trips[0].geometry.coordinates,
      },
    };

    if (map.getSource("route")) {
      map.getSource("route").setData(routeGeoJSON);
    } else {
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          data: routeGeoJSON,
          type: "geojson",
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  };

  geocoder.on("result", (e) => {
    setOrigin(e.result);
  });

  geocoder2.on("result", (e) => {
    setDestination(e.result);
  });

  return (
    <>
      {saveTrip ? (
        <TripCreationForm locationList={locationList} />
      ) : (
        <div className="main">
          {!(origin && destination && startTrip) ? (
            <form
              className="ui form origin-destination-inline-block"
              onSubmit={handleStartTrip}
            >
              <div className="two-fields">
                <div className="fields origin-destination-fields">
                  <div className="field">
                    <label id="starting-location-label">
                      Starting Location
                    </label>
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
          ) : (
            <LocationList
              origin={origin}
              destination={destination}
              coordinateList={coordinateList}
              locationList={locationList}
              setLocationList={setLocationList}
              setCoordinateList={setCoordinateList}
              geocoderContainerRef={geocoderContainerRef}
              fetchTripRoute={fetchTripRoute}
              startTrip={startTrip}
              geocoder3={geocoder3}
              setDestination={setDestination}
              map={map}
              setSaveTrip={setSaveTrip}
            />
          )}
          <div ref={mapContainer} className="mapContainer" id="map" />
        </div>
      )}
    </>
  );
}

export default Map;
