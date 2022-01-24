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
        <div>
        <Container text id="top-container" textAlign="center">
            <div id="title-div">
                <Header as='h1' content='Adventure Time' inverted id="main-title" />
            </div>
            <Button primary size='huge' as={Link} to="/adventure/planning" id="plan-trip-btn">
                Plan Trip
                <Icon name='car' id="car-icon" />
            </Button>
        </Container>
        </div>
    </>
}

export default ViewHome;