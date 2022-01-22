import { Comment } from 'semantic-ui-react';

function Comments({comment}) {
    return <>
        <Comment>
            <Comment.Content>
                <Comment.Author as='a'>{comment.profileId}</Comment.Author>
                <Comment.Text>{comment.commentBody}</Comment.Text>
            </Comment.Content>
        </Comment>
    </>
}

export default Comments;