import { Form, Button, FormField, Dropdown } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import { uploadFile } from "../../services/s3Api";
import { save } from "../../services/PhotoApi";
import ErrorSummary from "../../ErrorSummary";
import AuthContext from "../../AuthContext";

const EMPTY_PHOTO = {
    "photoId": 0,
    "photo": "",
    "tripLocationId": 0,
    "caption": ""
}

function PhotoForm({ locations }) {

    // TODO: S3 integration, and tripLocationId === locationId for save.

    const [errors, setErrors] = useState([]);
    const [thePhoto, setThePhoto] = useState(EMPTY_PHOTO);
    const [formData, setFormData] = useState(new FormData())
    const [file, setFile] = useState("");
    const auth = useContext(AuthContext);


    const handleChange = (evt) => {
        const nextPhoto = {...thePhoto};
        nextPhoto[evt.target.name] = evt.target.value;
        setThePhoto(nextPhoto);
    };

    const handleImageChange = (evt) => {
        setFile(evt.target.value);

        const newFormData = new FormData();
        newFormData.append('type', 'file');
        newFormData.append('image', evt.target.files[0]);

        setFormData(newFormData);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        uploadFile(formData)
            .then((data) => {

                thePhoto.photo = data.url;

                save(thePhoto, auth.user.token)
                    .then(console.log(thePhoto))
                    .catch(setErrors);
            })
            .catch(setErrors);
    };

    return <>
        <h1>Upload Photo</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Field required>
                <input type="file" value={file} onChange={handleImageChange} />
            </Form.Field>
            <Form.Field>
                <label>Enter caption(optional): </label>
                <input type="text" value={thePhoto.caption} name="caption" onChange={handleChange} placeholder="enter a caption" />
            </Form.Field>
            <Form.Field required>
                <label for="location-select">Location: </label>
                <select name="tripLocationId" value={thePhoto.tripLocationId} id="location-select" onChange={handleChange}>
                    <option value="">Select a location</option>
                    {locations.map(a => <option value={a.location.locationId}>{a.location.name}</option>)}
                </select>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
        <ErrorSummary errors={errors}/>
    </>
}

export default PhotoForm;