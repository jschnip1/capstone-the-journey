import { Form, Button, FormField } from "semantic-ui-react";
import { useState, useContext, useEffect } from "react";
import ErrorSummary from "../../ErrorSummary";

function PhotoForm() {

    // TODO: Drop down to select location? Need some way to select location

    const [errors, setErrors] = useState([]);

    const handleChange = (evt) => {

    };

    return <>
        <h1>Upload Photo</h1>
        <Form>
            <Form.Field>
                <input type="file" value="" name="tripPhoto" onChange={handleChange} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
        <ErrorSummary errors={errors}/>
    </>
}

export default PhotoForm;