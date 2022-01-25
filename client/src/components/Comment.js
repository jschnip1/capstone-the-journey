import { Comment, Icon, Modal, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from '../AuthContext';

function Comments({comment}) {

    // TODO: how to get commentId in order to delete that specific comment
    // add console.log to confirm what comment is selected

    const auth = useContext(AuthContext);

    return <>
        <Comment>
            <Comment.Content>
                <Comment.Author as='a'>{comment.profileId}</Comment.Author>
                <Comment.Text>{comment.commentBody} </Comment.Text>
                {auth.profile.profileId === comment.profileId ? <Modal
                    trigger={<Link>Delete</Link>}
                    header='Confirm Delete'
                    content='Are you sure you want to delete? This will permanently remove the comment'
                    actions={['Cancel', { key: 'delete', content: 'Delete', positive: true }]}
                        /> : null}
 
            </Comment.Content>
        </Comment>
    </>
}

export default Comments;