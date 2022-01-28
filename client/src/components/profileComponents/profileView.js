import { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Image, Divider, Grid, Card } from 'semantic-ui-react'
import AuthContext from "../../AuthContext";
import TripCards from "./TripCards";

function ProfileView() {

    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (!auth.user.username) {
            history.push("/login")
        }
        else if (auth.profile.profileId === 0) {
            history.push("/create/profile")
        }
        console.log(auth.profile)
    }, [auth, history])

    return (
        <>
            <Grid verticalAlign="middle" id="profile-view" celled>
                <Grid.Row style={{ minHeight: 115 }} >
                    <Grid.Column width={3} >
                        <Image src={auth.profile.profilePhoto !== null ? auth.profile.profilePhoto : "https://www.loveyourdog.com/wp-content/uploads/2020/04/Siberian-Husky-in-Snow.jpg"} size='small' id="profile-pic" circular />
                    </Grid.Column>
                    <Grid.Column width={12} verticalAlign="bottom">
                        <h1 id="profile-name">{auth.profile.name}</h1>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={16}>
                        <h3 className="profile-sub-title">About Me</h3>
                        <Divider />
                        <p>{auth.profile.profileDescription}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row  >
                    <Grid.Column width={16}>
                        <h3 className="profile-sub-title">My Trips</h3>
                        <Divider />
                        <Card.Group itemsPerRow={3}>
                            <TripCards />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default ProfileView;