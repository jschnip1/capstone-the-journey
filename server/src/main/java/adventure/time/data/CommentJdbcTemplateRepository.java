package adventure.time.data;

import adventure.time.data.mappers.CommentMapper;
import adventure.time.models.Comment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CommentJdbcTemplateRepository implements CommentRepository {

    private final JdbcTemplate jdbcTemplate;


    public CommentJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Comment> findAll() {

        final String sql = "select comment_id, trip_id, comment_body, profile_id from comment;";

        return jdbcTemplate.query(sql, new CommentMapper());
    }

    @Override
    public Comment findById(int commentId) {

        final String sql = "select comment_id, trip_id, comment_body, profile_id from comment where comment_id = ?;";

        return jdbcTemplate.query(sql, new CommentMapper(), commentId).stream().findFirst().orElse(null);
    }

    @Override
    public List<Comment> findByTripId(int tripId) {
        final String sql = "select comment_id, trip_id, comment_body, profile_id from comment where trip_id = ?;";

        return jdbcTemplate.query(sql, new CommentMapper(), tripId);
    }

    @Override
    public List<Comment> findByProfileId(int profileId) {

        final String sql = "select comment_id, trip_id, comment_body, profile_id from comment where profile_id = ?;";

        return jdbcTemplate.query(sql, new CommentMapper(), profileId);
    }

    @Override
    public Comment add(Comment comment) {

        final String sql = "insert into comment (trip_id, comment_body, profile_id) values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, comment.getTripId());
            ps.setString(2, comment.getCommentBody());
            ps.setInt(3, comment.getProfileId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        comment.setCommentId(keyHolder.getKey().intValue());
        return comment;
    }

    @Override
    public boolean update(Comment comment) {

        final String sql = "update comment set "
                + "comment_body = ? "
                + "where comment_id = ?;";

        return jdbcTemplate.update(sql,
                comment.getCommentBody(),
                comment.getCommentId()) > 0;
    }

    @Override
    public boolean deleteById(int commentId) {
        return jdbcTemplate.update("delete from comment where comment_id = ?", commentId) > 0;
    }

    @Override
    public boolean deleteByTripId(int tripId) {
        return jdbcTemplate.update("delete from comment where trip_id = ?", tripId) > 0;
    }
}
