import { useEffect, useContext  } from "react";
import { useHistory, Link } from "react-router-dom";
import { Image, Divider,Card, Icon } from 'semantic-ui-react'
import AuthContext from "../../AuthContext";

function ProfileView() {

    // TODO: Change the path for the link, add trip fetch with profileId, profile photo needs updating.

    const auth = useContext(AuthContext);
    const history = useHistory();
    
    useEffect(() => {
        if(!auth.user.username){
            history.push("/login")
        }
        else if(auth.profile.profileId === 0){
            history.push("/create/profile")
        }
    },[auth, history])

    return (
        <>
        <div id="profile-view">
            <Image src={auth.profile.profilePhoto !== null ? auth.profile.profilePhoto : "https://cdn.pixabay.com/photo/2019/07/07/14/03/fiat-4322521_1280.jpg"} size='small' id="profile-pic" />
            <h1 id="profile-name">{auth.profile.name}</h1>
            <Divider />
            <h3>About Me</h3>
            <Divider />
            <p>{auth.profile.profileDescription}</p>
            <h3>My Trips</h3>
            <Divider />
            <Card as={Link} to="/trip/overview/1">
                <Card.Content header='Trip Name' />
                <Card.Content content="Something should be here" />
                <Card.Content extra>
                <Icon name='map' />x miles
                </Card.Content>
            </Card>
         </div>
        </>
    )
}

export default ProfileView;