import { Form, Button, FormField } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../AuthContext";
import { getProfileByUsername, save } from "../../services/profileApi";
import ErrorSummary from "../../ErrorSummary";


function ProfileForm() {

    const [profile, setProfile] = useState({ profileId: 0, profilePhoto: "", profileDescription: "", name: "", userId: 0 })
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (auth.profile.profileId !== 0) {
            history.push("/profile")
        }

    }, [auth, history])

    const handleChange = (evt) => {
        const nextProfile = { ...profile };
        nextProfile[evt.target.name] = evt.target.value;
        setProfile(nextProfile);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        save(profile, auth.user.username, auth.token)
            .then(() => {
                getProfileByUsername(auth.user.username)
                    .then((data) => {
                        auth.profile = data;
                        history.push("/profile")
                    })
                    .catch(setErrors);
            })
            .catch(setErrors)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <label>Name</label>
                    <input type="text" placeholder='John Doe' value={profile.name} name="name" onChange={handleChange} />
                </FormField>
                {/* <FormField>
                <label>Last Name</label>
                <input type="text" placeholder='Doe' />
            </FormField> */}
                <Form.Field>
                    <label>About</label>
                    <textarea placeholder='Tell us more about you...' value={profile.profileDescription} name="profileDescription" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>About</label>
                    <input type="file" value={profile.profilePhoto} name="profilePhoto" onChange={handleChange} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
            <ErrorSummary errors={errors}/>
        </>
    )
}

export default ProfileForm;