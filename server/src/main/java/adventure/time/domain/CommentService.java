package adventure.time.domain;

import adventure.time.data.CommentRepository;
import adventure.time.models.Comment;
import adventure.time.models.Trip;
import adventure.time.models.TripLocation;

import java.util.List;

public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    public List<Comment> findAll(){
        return commentRepository.findAll();
    }

    public Comment findById(int commentId){
        return commentRepository.findById(commentId);
    }

     public List<Comment> findByTripId(int tripId){
        return commentRepository.findByTripId(tripId);
     }

     public List<Comment> findByProfileId(int profileId){
        return commentRepository.findByProfileId(profileId);
     }

     public Result<Comment> add(Comment comment){
         Result<Comment> result = validate(comment);
         if(!result.isSuccess()) {
             return result;
         }

         if (comment.getCommentId() != 0) {
             result.addMessage("commentId cannot be set for 'add' operation", ResultType.INVALID);
             return result;
         }

         comment = commentRepository.add(comment);
         result.setPayload(comment);
         return result;
     }

    public Result<Comment> update(Comment comment) {
        Result<Comment> result = validate(comment);
        if (!result.isSuccess()) {
            return result;
        }

        if (comment.getCommentId() <= 0) {
            result.addMessage("commentId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!commentRepository.update(comment)) {
            String msg = String.format("commentId: %s, not found", comment.getCommentId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int commentId) {
        return commentRepository.deleteById(commentId);
    }

    private Result<Comment> validate(Comment comment) {
        Result<Comment> result = new Result<>();
        if (comment == null) {
            result.addMessage("Comment cannot be null", ResultType.INVALID);
            return result;
        }

        if (comment.getCommentBody() == null || comment.getCommentBody().isBlank() || comment.getCommentBody().isEmpty()) {
            result.addMessage("Must enter comment", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
