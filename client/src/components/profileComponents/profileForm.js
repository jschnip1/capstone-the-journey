import { Form, Button, FormField } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../AuthContext";
import { getProfileByUsername, save } from "../../services/profileApi";


function ProfileForm() {

    const [authUserId, setAuthUserId] = useState(0)
    const [profile, setProfile] = useState({profileId: 0, profilePhoto: "", profileDescription: "", name: "", userId: authUserId})
    

    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        // getProfileByUsername(auth.user.username)

    }, [auth, history])

    const handleChange = (evt) => {
        const nextProfile = { ...profile };
        nextProfile[evt.target.name] = evt.target.value;
        setProfile(nextProfile);
    };

    const handleSubmit = () => {
        save(profile, auth.user.username, auth.token)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormField>
                <label>Name</label>
                <input type="text" placeholder='John Doe' value={profile.name} name="name" onChange={handleChange}/>
            </FormField>
            {/* <FormField>
                <label>Last Name</label>
                <input type="text" placeholder='Doe' />
            </FormField> */}
            <Form.Field>
                <label>About</label>
                <textarea placeholder='Tell us more about you...' value={profile.profileDescription} name="profileDescription" onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>About</label>
                <input type="file" value={profile.profilePhoto} name="profilePhoto" onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default ProfileForm;