import { Button, Checkbox, Form } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { saveTrip } from "../services/TripApi";
import { saveLocation } from "../services/LocationApi";
import { saveTripLocation } from "../services/TripLocationApi";
import AuthContext from "../AuthContext";
import ErrorSummary from "../ErrorSummary";
import { toast } from "react-toastify";

const EMPTY_TRIP = {
  tripId: 0,
  startTime: "",
  endTime: "",
  tripReview: 0,
  totalDistance: 0,
  name: "",
  disabled: false,
};

const EMPTY_TRIP_LOCATION = {
  tripLocationId: 0,
  tripId: 0,
  location: {},
  sortOrder: 0,
};

const EMPTY_LOCATION = {
  locationId: 0,
  latitude: "",
  longitude: "",
  name: "",
  type: "",
  photoUrl: "",
  disabled: false,
};

function TripCreationForm({ locationList }) {

  const [theTrip, setTheTrip] = useState(EMPTY_TRIP);
  const [theLocation, setTheLocation] = useState(EMPTY_LOCATION);
  const [theTripLocation, setTheTripLocation] = useState(EMPTY_TRIP_LOCATION);
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleChange = (evt) => {
    const nextTrip = { ...theTrip };
    nextTrip[evt.target.name] = evt.target.value;
    setTheTrip(nextTrip);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    toast("Saving Trip 🚗💨", { autoClose: 1000, pauseOnHover: true });
    saveTrip(theTrip, auth.user.token, auth.profile.profileId)
      .then((tripData) => {
        for (let i = 0; i < locationList.length; i++) {
          theLocation["longitude"] = locationList[i].geometry.coordinates[0];
          theLocation["latitude"] = locationList[i].geometry.coordinates[1];
          theLocation["name"] = locationList[i].place_name;
          theLocation["disabled"] = false;
          saveLocation(theLocation)
            .then((locationData) => {
              theTripLocation["tripId"] = tripData.tripId;
              theTripLocation["location"] = locationData;
              theTripLocation["sortOrder"] = i + 1;
              saveTripLocation(theTripLocation, auth.user.token)
                .then((tripLocationData) => {
                })
                .catch((error) => {
                  toast.error(`${error}`);
                });
            })
            .catch((error) => {
              toast.error(`${error}`);
            });
        }
        auth.profile.tripList.push(tripData);
        history.push("/profile");
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Trip Name</label>
          <input
            placeholder="Trip Name"
            name="name"
            value={theTrip.name}
            type="text"
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Start Date</label>
          <input
            type="date"
            name="startTime"
            value={theTrip.startTime}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>End Date</label>
          <input
            type="date"
            name="endTime"
            value={theTrip.endTime}
            onChange={handleChange}
            required
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default TripCreationForm;
