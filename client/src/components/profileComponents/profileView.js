import { useEffect, useContext  } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../AuthContext";

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
         <h1>{auth.profile.name}</h1>
         <h2>{auth.profile.profilePhoto}</h2>
        </>
    )
}

export default ProfileView;