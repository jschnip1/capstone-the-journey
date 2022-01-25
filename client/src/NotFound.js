import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

function NotFound() {
    return <>
        <div id="not-found">
        <Container textAlign="center">
            <Header as="h1" color="orange">404</Header>
            <p>Looks like you lost your way, let us help you get back on track!</p>
            <p>Start planning a <Link to="/adventure/planning">trip</Link>, or head back to the <Link to="/">homepage</Link></p>
        </Container>
        </div>
    </>
}

export default NotFound;