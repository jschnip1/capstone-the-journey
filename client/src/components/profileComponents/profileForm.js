import { Form, Button, FormField, Grid, Header } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../AuthContext";
import { getProfileByUsername, save } from "../../services/profileApi";
import { uploadFile } from "../../services/s3Api";
import ErrorSummary from "../../ErrorSummary";
import { toast } from "react-toastify";

function ProfileForm() {
  const [profile, setProfile] = useState({
    profileId: 0,
    profilePhoto: "",
    profileDescription: "",
    name: "",
    userId: 0,
  });
  const [formData, setFormData] = useState(new FormData());
  const [file, setFile] = useState("");

  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (auth.profile.profileId !== 0) {
      history.push("/profile");
    }
  }, [auth, history]);

  const handleChange = (evt) => {
    const nextProfile = { ...profile };
    nextProfile[evt.target.name] = evt.target.value;
    setProfile(nextProfile);
  };

  const handleImageChange = (evt) => {
    setFile(evt.target.value);

    const newFormData = new FormData();
    newFormData.append("type", "file");
    newFormData.append("image", evt.target.files[0]);

    setFormData(newFormData);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    uploadFile(formData).then((data) => {
      profile.profilePhoto = data.url;

      save(profile, auth.user.username, auth.token)
        .then(() => {
          getProfileByUsername(auth.user.username)
            .then((data) => {
              auth.profile = data;
              history.push("/profile");
            })
            .catch((error) => {
              toast.error(`${error}`);
            });
        })
        .catch((error) => {
          toast.error(`${error}`);
        });
    });
  };

  return (
    <Grid textAlign="center" style={{ height: "65vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth:"50%" }} verticalAlign="top">
        <div id="profile-form">
          <Header>Profile Information</Header>
          <Form size="large" onSubmit={handleSubmit}>
            <FormField>
              <label>Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={profile.name}
                name="name"
                onChange={handleChange}
              />
            </FormField>
            <Form.Field>
              <label>About</label>
              <textarea
                placeholder="Tell us more about you..."
                value={profile.profileDescription}
                name="profileDescription"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Profile Photo</label>
              <input type="file" value={file} onChange={handleImageChange}  />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          <ErrorSummary />
        </div>
      </Grid.Column>
    </Grid>
  );
}

export default ProfileForm;
