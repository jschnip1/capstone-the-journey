import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { saveTrip } from "../services/TripApi";
import { saveLocation } from "../services/LocationApi";
import { saveTripLocation } from "../services/TripLocationApi";
import AuthContext from "../AuthContext";
import ErrorSummary from "../ErrorSummary";

const EMPTY_TRIP = {
  "tripId": 0,
  "startTime": "",
  "endTime": "",
  "tripReview": 0,
  "totalDistance": 0,
  "name": "",
  "disabled": false
}

const EMPTY_TRIP_LOCATION = {
  "tripLocationId": 0,
  "tripId": 0,
  "location": {},
  "sortOrder": 0
}

const EMPTY_LOCATION = {
  "locationId": 0,
  "latitude": "",
  "longitude": "",
  "name": "",
  "type": "",
  "photoUrl": "",
  "disabled": false
}


function TripCreationForm({ locationList }) {
      // <div>
    //   TripCreationForm
    //   {locationList.map((e, index) => (
    //     <>
    //       <h1>Trip Locations</h1>
    //       <div>
    //         {index}: {e.text}
    //       </div>
    //     </>
    //   ))}
    // </div>



    // need to create trip on submit, then create the locations and with those create trip location.

    // need to convert latitude and longitude into strings in order to add them.
    // latitude: locationList[i].geometry.coordinates[1];
    // longitude: locationList[i].geometry.coordinates[0];
    // location name: locationList[i].place_name;

    // console.log(locationList);

    const [theTrip, setTheTrip] = useState(EMPTY_TRIP);
    const [theLocation, setTheLocation] = useState(EMPTY_LOCATION);
    const [theTripLocation, setTheTripLocation] = useState(EMPTY_TRIP_LOCATION);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    const history = useHistory();

    const handleChange = (evt) => {
      const nextTrip = {...theTrip};
      nextTrip[evt.target.name] = evt.target.value;
      setTheTrip(nextTrip);
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      saveTrip(theTrip, auth.user.token, auth.profile.profileId)
        .then((tripData) => {
          console.log(tripData);
          for (let i = 0; i < locationList.length; i++) {
            theLocation["longitude"] = locationList[i].geometry.coordinates[0];
            theLocation["latitude"] = locationList[i].geometry.coordinates[1];
            theLocation["name"] = locationList[i].place_name;
            theLocation["disabled"] = false;
            saveLocation(theLocation)
              .then((locationData) => {
                console.log(locationData);
                theTripLocation["tripId"] = tripData.tripId;
                theTripLocation["location"] = locationData;
                theTripLocation["sortOrder"] = i+1;
                saveTripLocation(theTripLocation, auth.user.token)
                  .then((tripLocationData) => {
                    console.log(tripLocationData);
                  })
                  .catch(console.log)
              })
              .catch(console.log)
          }
          history.push("/profile");
        })
        .catch(console.log);
    }


  return <>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Trip Name</label>
          <input placeholder='Trip Name' name="name" value={theTrip.name}type="text" onChange={handleChange} required />
        </Form.Field>
        <Form.Field>
          <label>Start Date</label>
          <input type="date" name="startTime" value={theTrip.startTime} onChange={handleChange} required />
        </Form.Field>
        <Form.Field>
          <label>End Date</label>
          <input type="date" name="endTime" value={theTrip.endTime} onChange={handleChange} required />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>

    </>
}

export default TripCreationForm;
