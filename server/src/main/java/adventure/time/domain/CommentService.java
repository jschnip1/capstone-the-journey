package adventure.time.domain;

import adventure.time.data.CommentRepository;
import adventure.time.models.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository repository;

    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    public List<Comment> findAll() {
        return repository.findAll();
    }

    public Comment findById(int commentId) {
        return repository.findById(commentId);
    }

    public List<Comment> findByTripId(int tripId) {
        return repository.findByTripId(tripId);
    }

    public List<Comment> findByProfileId(int profileId) {
        return repository.findByProfileId(profileId);
    }

    public Result<Comment> add(Comment comment) {
        Result<Comment> result = validate(comment);
        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() != 0) {
            result.addMessage("cannot add commentId for add", ResultType.INVALID);
            return result;
        }

        comment = repository.add(comment);
        result.setPayload(comment);
        return result;
    }

    public Result<Comment> update(Comment comment) {
        Result<Comment> result = validate(comment);
        if(!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() <= 0) {
            result.addMessage("must have commentId for update", ResultType.INVALID);
            return result;
        }

        if(!repository.update(comment)) {
            String msg = String.format("commentId: %s cannot be found", comment.getCommentId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int commentId) {
        return repository.deleteById(commentId);
    }

    public boolean deleteByTripId(int tripId) {
        return repository.deleteByTripId(tripId);
    }

    private Result<Comment> validate(Comment comment) {
        Result<Comment> result = new Result<>();
        if (comment == null) {
            result.addMessage("comment cannot be null", ResultType.INVALID);
            return result;
        }

        if (comment.getCommentBody().isBlank() || comment.getCommentBody().isEmpty()) {
            result.addMessage("commentBody cannot be empty", ResultType.INVALID);
            return result;
        }

        if (comment.getTripId() < 1) {
            result.addMessage("tripId is required", ResultType.INVALID);
            return result;
        }

        if (comment.getProfileId() < 1) {
            result.addMessage("profileId is required", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
