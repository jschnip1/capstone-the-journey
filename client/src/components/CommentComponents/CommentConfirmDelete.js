import { Modal, Button } from 'semantic-ui-react';
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteById } from "../../services/CommentApi";
import AuthContext from '../../AuthContext';
import { toast } from 'react-toastify';

function CommentConfirmDelete({ comment, onConfirm }) {

    const [open, setOpen] = useState(false);
    const [currentComment, setComment] = useState(comment);

    const auth = useContext(AuthContext);

    const handleDelete = () => {
        deleteById(comment.commentId, auth.user.token)
        .then(() => {
            onConfirm(currentComment.tripId)
            setOpen(false)
        })
        .catch(error => {
            toast.error(`${error}`)
        })
    }

    return <>
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
                    onClick={handleDelete}
                    positive
                    />
                </Modal.Actions>
            </Modal>
    </>
}

export default CommentConfirmDelete;