import { Item } from 'semantic-ui-react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Trip from "./Trip";
import { fetchById } from "../services/TripApi";

const EMPTY_TRIP = {
    "tripId": 0,
    "startTime": 0,
    "endTime": 0,
    "tripReview": 0,
    "totalDistance": 0,
    "name": "",
    "disabled": false,
    "itemList": [],
    "commentList": [],
    "locations": []
}

function ViewTrips() {

    const [trip, setTrip] = useState(EMPTY_TRIP);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchById(id)
                .then(setTrip)
                .catch(console.log);
        }
    }, [id]);

    return <>
        <Item.Group>
            <h3>Start Date: {trip.startTime}    End Date: {trip.endTime}</h3>
            {trip.locations.map(a => <Trip key={a.location.locationId} trip={a.location} />)}
        </Item.Group>
    </>
}

export default ViewTrips;