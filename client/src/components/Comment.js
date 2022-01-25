import { Comment, Icon, Modal, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from '../AuthContext';

function Comments({comment}) {

    // TODO: If signed in profileId matches comment profileId show delete link

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