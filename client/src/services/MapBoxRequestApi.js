import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { TripsLayer } from "deck.gl";
import { map } from "leaflet";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

// Add your access token
mapboxgl.accessToken =
  "pk.eyJ1IjoieWVsbG93LXJhbmdlciIsImEiOiJja3lrZHJnaW4waTh2MnBvMGsyM2YxZm1lIn0.Hl-fBAj0_GaGVa1YVTlUMg";

// Create an empty GeoJSON feature collection for drop off locations
const locationList = turf.featureCollection([]);
const pointHopper = {};

export async function addWaypoints(event, map) {
  await newWayPoint(map.unproject(event.point));
  updateWayPoints(locationList);
}

export async function newWayPoint(coordinates) {
  const pt = turf.point([coordinates.lng, coordinates.lat], {
    key: Math.abs(coordinates.lng * coordinates.lat) * Math.random(),
  });
  locationList.features.push(pt);
  pointHopper[pt.properties.key] = pt;

  const query = await fetch(assembleQueryURL(), { method: "GET" });
  const response = await query.json();

  if (response.code !== "Ok") {
    const handleMessage =
      response.code === "InvalidInput"
        ? "Refresh to start a new route"
        : "Try a different point.";
    alert(`${response.code} - ${response.message}\n\n${handleMessage}`);
    locationList.features.pop();
    delete pointHopper[pt.properties.key];
    return;
  }

  const routeGeoJSON = turf.featureCollection([
    turf.feature(response.trips[0].geometry),
  ]);

  map.getSource("route").setData(routeGeoJSON);
}

function updateWayPoints(geojson) {
  map.getSource("trip-location-symbol").setData(geojson);
}

function assembleQueryURL() {
  const coordinates = [];
  let tripLocationIndex;

  const tripLocationList = Object.keys(pointHopper).map(
    (key) => pointHopper[key]
  );

  for (const pitStop of tripLocationList) {
    coordinates.push(pitStop.geometry.coordinates);
  }

  return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
    ";"
  )}&overview=full&steps=true&geometries=geojson&source=first&access_token=${
    mapboxgl.accessToken
  }`;
}
