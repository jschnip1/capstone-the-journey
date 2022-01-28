import { useEffect, useContext  } from "react";
import { useHistory, Link } from "react-router-dom";
import { Image, Divider,Card, Icon } from 'semantic-ui-react'
import AuthContext from "../../AuthContext";
import TripCards from "./TripCards";

function ProfileView() {

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

            <Image src={auth.profile.profilePhoto !== null ? auth.profile.profilePhoto : "https://www.loveyourdog.com/wp-content/uploads/2020/04/Siberian-Husky-in-Snow.jpg"} size='small' id="profile-pic" />
            <h1 id="profile-name">{auth.profile.name}</h1>
            <Divider />
            <h3 className="profile-sub-title">About Me</h3>
            <Divider />
            <p>{auth.profile.profileDescription}</p>
            <h3 className="profile-sub-title">My Trips</h3>
            <Divider />
            <TripCards />
         </div>
        </>
    )
}

export default ProfileView;