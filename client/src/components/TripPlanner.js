import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

function TripPlanner() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-81.69929332417247);
  const [lat, setLat] = useState(41.506492186234055);
  const [zoom, setZoom] = useState(12);

  let directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/yellow-ranger/ckyolpbst29pe15pq1cniobi5",
        center: [lng, lat],
        zoom: zoom,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        "top-left"
      );
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (!map) return;
    console.log(map);
    console.log(mapContainer);
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  });

  const addDestination = () => {
    directions.addWaypoint(0, [77.0365, 38.8977]);
    map.addDestination.addControl(directions, "top-left");
  };

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
