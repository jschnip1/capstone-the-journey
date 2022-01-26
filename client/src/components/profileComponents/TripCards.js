import AuthContext from "../../AuthContext";
import { Image, Divider,Card, Icon } from 'semantic-ui-react';
import { useHistory, Link } from "react-router-dom";
import { useContext } from "react";

function TripCards() {

    const auth = useContext(AuthContext);

    return <>
        {auth.profile.tripList.map(a => 
            <Card key={a.tripId} as={Link} to={`/trip/overview/${a.tripId}`}>
                <Card.Content header={a.name} />
                <Card.Content content={`Start Time: ${a.startTime}`} />
                <Card.Content extra>
                <Icon name='map' />{a.totalDistance} miles
                </Card.Content>
            </Card>)}
    </>
}

export default TripCards;