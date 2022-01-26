import { Form, Button, FormField, Dropdown } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import ErrorSummary from "../../ErrorSummary";

function PhotoForm({ locations }) {

    // TODO: S3 integration, and tripLocationId === locationId for save.

    const [errors, setErrors] = useState([]);


    const handleChange = (evt) => {

    };

    return <>
        <h1>Upload Photo</h1>
        <Form>
            <Form.Field>
                <input type="file" value="" name="tripPhoto" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
                <label>Enter caption(optional): </label>
                <input type="text" name="caption" onChange={handleChange} placeholder="enter a caption" />
            </Form.Field>
            <Form.Field>
                <label for="location-select">Location: </label>
                <select name="location" id="location-select">
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