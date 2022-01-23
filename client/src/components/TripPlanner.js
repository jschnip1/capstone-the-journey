import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../styling/TripPlanner.css";
import { MdAddLocation } from "react-icons/fa";

function TripPlanner() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(38.8977);
  const [lat, setLat] = useState(-77.0365);
  const [zoom, setZoom] = useState(13);
  const [currentLocation, setCurrentLocation] = useState(false);

  function successLocation(position) {
    setCurrentLocation(true);
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    map.flyTo({ center: [lat, lng], zoom: 10 });
    setCurrentLocation(false);
  }

  function errorLocation() {
    setLat(38.8977);
    setLng(-77.0365);
  }

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/yellow-ranger/ckyolpbst29pe15pq1cniobi5",
        center: [lat, lng],
        zoom: zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      const directions = new MapboxDirections({
        accessToken: mapboxgl.getRTLTextPluginStatus.accessToken,
      });
      map.addControl(directions, "top-left");
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (!map) return;
    if (currentLocation) return;
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  });

  var geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          "marker-color": "#f76565",
          "marker-symbol": "circle-stroked",
          "marker-color": "ff1f20",
          "marker-size": "medium",
          route: { id: 1, type: "origin", points: 2 },
        },
        geometry: {
          type: "Point",
          coordinates: ["144.9758769", "-37.8437403"],
        },
      },
      {
        type: "Feature",
        properties: {
          "marker-color": "#f76565",
          "marker-symbol": "circle-stroked",
          "marker-color": "23be20",
          "marker-size": "medium",
          route: { id: 2, type: "destination", points: 3 },
        },
        geometry: {
          type: "Point",
          coordinates: ["115.869578", "-31.980216"],
        },
      },
    ],
  };

  const origin = geoJson.features[0];
  const destination = geoJson.features[1];
  // let directions = new MapboxDirections({
  //   accessToken: mapboxgl.accessToken,
  // });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={(el) => (mapContainer.current = el)}
        className="map-container"
      />
    </div>
  );
}

export default TripPlanner;
