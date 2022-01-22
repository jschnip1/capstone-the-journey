import { Button, Comment, Form} from 'semantic-ui-react';
import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { save } from "../services/CommentApi";
import ErrorSummary from "../ErrorSummary";
import AuthContext from '../AuthContext';
import { fetchAll } from "../services/CommentApi";

const EMPTY_COMMENT = {
    "commentId": 0,
    "tripId": 0,
    "commentBody": "",
    "profileId": 0
}

function CommentForm() {
    const [theComment, setTheComment] = useState(EMPTY_COMMENT);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const { id } = useParams();

    const history = useHistory();

    const handleChange = (evt) => {
        const nextComment = {...theComment};
        nextComment[evt.target.name] = evt.target.value;
        nextComment["tripId"] = id;
        nextComment["profileId"] = 1;
        setTheComment(nextComment);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        save(theComment)
            .then(() => {
                history.push(`trip/overview/${id}`)
            })
            .catch(setErrors);
    }



    return <>
        <Form reply>
            <Form.TextArea  name="commentBody" onChange={handleChange} />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleSubmit}/>
        </Form>
        <ErrorSummary errors={errors} />
    </>
}

export default CommentForm;