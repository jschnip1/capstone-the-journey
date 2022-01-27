import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

import AuthContext from '../AuthContext';

function ViewHome() {

    const history = useHistory();
    const auth = useContext(AuthContext)

    const handleClick = () => {
        if(auth.user.username === "") {
            history.push("/login")
        }
        else {
            history.push("/adventure/planning")
        }
    }

    return <>
        <div>
        <Container text id="top-container" textAlign="center">
            <div id="title-div">
                <Header as='h1' content='Adventure Time' inverted id="main-title" />
            </div>
            <Button primary size='huge' id="plan-trip-btn" onClick={handleClick}>
                Plan Trip
                <Icon name='car' id="car-icon" />
            </Button>
        </Container>
        </div>
    </>
}

export default ViewHome;