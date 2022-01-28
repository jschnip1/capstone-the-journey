
import { useEffect, useState } from "react";
import { Card, Container } from "semantic-ui-react";
import { fetchAll } from "../../services/TripApi";
import AllTripCards from "./allTripCards";
import { toast } from "react-toastify";

function AllTrips() {

    const [allTrips, setAllTrips] = useState([]);

    useEffect(() => {
        if (allTrips.length === 0) {
            fetchAll()
                .then(setAllTrips)
                .catch((error) => {
                    toast.error(`${error}`);
                  });
        }

    });

    return (
        <Container>
            <Card.Group centered itemsPerRow={3}>
                {allTrips.map(trip => <AllTripCards key={trip.tripId} tripInfo={trip} />)}
            </Card.Group>
        </Container>
    )
}

export default AllTrips;