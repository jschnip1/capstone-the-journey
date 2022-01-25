import { Comment, Icon, Modal, Button, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from '../AuthContext';
import { deleteById } from "../services/CommentApi";

function Comments({comment}) {

    // TODO: delete comment works but it doesnt refresh to show that change.

    const [open, setOpen] = useState(false);

    const auth = useContext(AuthContext);

    const handleDeleteClick = (e) => {
        deleteById(comment.commentId, auth.user.token)
            .then(setOpen(false))
            .catch(console.log);
    };

    return <>
        <Comment>
            <Comment.Content>
                <Comment.Author>{auth.profile.name}</Comment.Author>
                <Comment.Text>{comment.commentBody} </Comment.Text>
                  {auth.profile.profileId === comment.profileId ?       
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Link>Delete</Link>}
                        >
                        <Modal.Header>Confirm Delete</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                            <p>
                                Are you sure you want to delete this comment this will permanently remove it?
                            </p>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                            Cancel
                            </Button>
                            <Button
                            content="Delete"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={() => handleDeleteClick()}
                            positive
                            />
                        </Modal.Actions>
                    </Modal> : null}
            </Comment.Content>
        </Comment>
    </>
}

export default Comments;