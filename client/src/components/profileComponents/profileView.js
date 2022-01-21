import { useEffect, useContext, useState  } from "react";
import { useHistory } from "react-router-dom";

import { getProfileByUsername } from "../../services/profileApi";
import AuthContext from "../../AuthContext";

function ProfileView() {
    
    const [profile, setProfile] = useState({profileId: 0, profilePhoto: {}, profileDescription: "", name: "", userId: 0, tripList: []})

    const auth = useContext(AuthContext);
    const history = useHistory();
    
    useEffect(() => {
        getProfileByUsername(auth.user.username)
        .then(setProfile)
        .catch(() => {
            history.push("/create/profile")
        })
    },[auth, history])

    return (
        <>
         <h1>Profile</h1>
         {console.log(profile)}
        </>
    )
}

export default ProfileView;