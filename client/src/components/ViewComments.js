import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment, Header } from 'semantic-ui-react';
import Comments from './Comment';
import CommentForm from "./CommentForm";
import { fetchByTripId } from "../services/CommentApi";

function ViewComments() {

    const [commentList, setCommentList] = useState([]);

    const { id } = useParams();

    // this needs to be changed to fetching by tripid not fetch all
    useEffect(() => {
        if (id) {
            fetchByTripId(id)
                .then(setCommentList)
                .catch(console.log);
        }
    }, [id]);

    return <>
    <Comment.Group>
        <Header as='h3' dividing>
            Comments
        </Header>
        {commentList.map(a => <Comments key={a.commentId} comment={a} />)}
        <CommentForm />
    </Comment.Group>
</>
}

export default ViewComments;