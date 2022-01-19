package adventure.time.data.mappers;

import adventure.time.models.Comment;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CommentMapper implements RowMapper<Comment> {

    @Override
    public Comment mapRow(ResultSet resultSet, int i) throws SQLException {
        Comment comment = new Comment();
        comment.setCommentId(resultSet.getInt("comment_id"));
        comment.setCommentBody(resultSet.getString("comment_body"));
        comment.setProfileId(resultSet.getInt("profile_id"));
        comment.setTripId(resultSet.getInt("trip_id"));
        return comment;
    }
}