import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function ViewHome() {
    return <>
        <Container text id="top-container" textAlign="center">
            <Header as='h1' content='Adventure Time' inverted id="main-title" />
            <Button primary size='huge' as={Link} to="/adventure/planning" id="plan-trip-btn">
                Plan Trip
                <Icon name='car' id="car-icon" />
            </Button>
        </Container>
    </>
}

export default ViewHome;