import { Button, Comment, Form } from "semantic-ui-react";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { save } from "../../services/CommentApi";
import ErrorSummary from "../../ErrorSummary";
import AuthContext from "../../AuthContext";
import { toast } from "react-toastify";

const EMPTY_COMMENT = {
  commentId: 0,
  tripId: 0,
  commentBody: "",
  profileId: 0,
};

function CommentForm({ onAdd }) {
  const [theComment, setTheComment] = useState(EMPTY_COMMENT);
  const [inputValue, setInputValue] = useState("");

  const auth = useContext(AuthContext);

  const { tripId } = useParams();

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
    const nextComment = { ...theComment };
    nextComment[evt.target.name] = evt.target.value;
    nextComment["tripId"] = tripId;
    nextComment["profileId"] = auth.profile.profileId;
    setTheComment(nextComment);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    save(theComment)
      .then((data) => {
        onAdd(data);
        setInputValue("");
      })
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  return (
    <>
      <Form reply>
        <Form.TextArea
          name="commentBody"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          content="Add Reply"
          labelPosition="left"
          icon="edit"
          primary
          onClick={handleSubmit}
        />
      </Form>
      <ErrorSummary />
    </>
  );
}

export default CommentForm;
