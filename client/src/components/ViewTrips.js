import { Item } from 'semantic-ui-react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Trip from "./Trip";
import { fetchById } from "../services/TripApi";

function ViewTrips() {

    const [trip, setTrip] = useState([]);

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
            {/* {trip.locations.map(a => <Trip key={a.location.locationId} trip={a.location} />)} */}
        </Item.Group>
    </>
}

export default ViewTrips;