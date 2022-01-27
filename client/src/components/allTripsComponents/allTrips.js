
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { fetchAll } from "../../services/TripApi";
import AllTripCards from "./allTripCards";

function AllTrips() {

    const [allTrips, setAllTrips] = useState([]);

    useEffect(() => {
        console.log(allTrips.length)
        if (allTrips.length === 0) {
            fetchAll()
                .then(setAllTrips)
                .catch(console.log)
        }

    });

    return (
        <>
            <Card.Group>
                {allTrips.map(trip => <AllTripCards key={trip.tripId} tripInfo={trip} />)}
            </Card.Group>
        </>
    )
}

export default AllTrips;