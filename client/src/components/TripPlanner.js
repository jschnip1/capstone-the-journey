import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "../styling/TripPlanner.css";
import ReactDOM from "react-dom";
import reactDom from "react-dom";
import AddLocationButton from "./AddLocationButton";

function TripPlanner() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const addLocationNode = useRef(null);
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
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
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
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
      window.localStorage.setItem("current-location-lat", lat);
      window.localStorage.setItem("current-location-lng", lng);
      window.localStorage.setItem("current-location-zoom", zoom);
      //if(addLocationNode.)
      addLocationNode.current =
        mapContainer.current.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
      //mapContainer.current.childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1];
      //console.log(addLocationNode.current);

      //reactDom.render(<AddLocationButton />, addLocationNode.current);
      // document.createElement("div");
      // addLocationNode.classList.add("addLocation");
      // addLocationNode.setAttribute("id", "addLocationNode");
      // document
      //   .querySelector(
      //     "#root > div > div:nth-child(2) > div.map-container.mapboxgl-map > div.mapboxgl-control-container > div.mapboxgl-ctrl-top-left > div > div.directions-control.directions-control-inputs > div"
      //   )
      //   .insertBefore(addLocationNode, null);
      //console.log(mapContainer.current);
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

  // map.on("click", (e) => {
  //   console.log(e);
  // });

  /** 
  // Add markers to the map.
for (const marker of geojson.features) {
  // Create a DOM element for each marker.
  const el = document.createElement('div');
  const width = marker.properties.iconSize[0];
  const height = marker.properties.iconSize[1];
  el.className = 'marker';
  el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.style.backgroundSize = '100%';
   
  el.addEventListener('click', () => {
  window.alert(marker.properties.message);
  });
   
  // Add markers to the map.
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .addTo(map);
  }

  **/

  //const addLocationNode = this.mapContainer.current;

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default TripPlanner;
