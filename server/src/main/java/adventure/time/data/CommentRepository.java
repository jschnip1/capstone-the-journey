package adventure.time.data;

import adventure.time.models.Comment;

import java.util.List;

public interface CommentRepository {

    List<Comment> findAll();

    Comment findById(int commentId);

    List<Comment> findByTripId(int tripId);

    List<Comment> findByProfileId(int profileId);

    Comment add(Comment comment);

    boolean update(Comment comment);

    boolean deleteById(int commentId);

    boolean deleteByTripId(int tripId);
}
