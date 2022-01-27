import { Comment, Icon, Modal, Button, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from '../../AuthContext';
import CommentConfirmDelete from './CommentConfirmDelete';

function Comments({comment, onDelete }) {

    // TODO: delete comment works but it doesnt refresh to show that change.
    // at the moment there is no way to get usernames of people not signed in.

    const auth = useContext(AuthContext);

    return <>
        <Comment>
            <Comment.Content>
                <Comment.Author>{comment.profileId}</Comment.Author>
                <Comment.Text>{comment.commentBody} </Comment.Text>
                  {auth.profile.profileId === comment.profileId ?       
                    <CommentConfirmDelete comment={comment} onConfirm={onDelete}/> : null}
            </Comment.Content>
        </Comment>
    </>
}

export default Comments;