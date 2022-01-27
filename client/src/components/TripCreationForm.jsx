import React from "react";

function TripCreationForm({ locationList }) {
  return (
    <div>
      TripCreationForm
      {locationList.map((e, index) => (
        <>
          <h1>Trip Locations</h1>
          <div>
            {index}: {e.text}
          </div>
        </>
      ))}
    </div>
  );
}

export default TripCreationForm;
