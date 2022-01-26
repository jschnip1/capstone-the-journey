import React from "react";

function LocationSearch({ id, geocoderContainerRef }) {
  return (
    <>
      <div id={id} ref={geocoderContainerRef}></div>
    </>
  );
}

export default LocationSearch;
