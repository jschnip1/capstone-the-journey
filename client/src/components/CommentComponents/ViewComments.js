import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment, Header } from 'semantic-ui-react';
import Comments from './Comment';
import CommentForm from "./CommentForm";
import { fetchByTripId } from "../../services/CommentApi";
import { toast } from "react-toastify";

function ViewComments({ comments }) {

    const [commentList, setCommentList] = useState(comments);

    // const { tripId } = useParams();

    const removeFromList = (tripId) => {
        fetchByTripId(tripId)
            .then(setCommentList)
            .catch((error) => {
                toast.error(`${error}`);
              });
    }

    const addToList = (comment) => {
        const newCommentList = [...commentList];
        newCommentList.push(comment)
        setCommentList(newCommentList);
    }

    return <>
    <Comment.Group>
        <Header as='h3' dividing>
            Comments
        </Header>
        {commentList.map(a => <Comments key={a.commentId} comment={a} onDelete={removeFromList}/>)}
        <CommentForm onAdd={addToList} />
    </Comment.Group>
</>
}

export default ViewComments;