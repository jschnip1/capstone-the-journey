package adventure.time.controllers;

import adventure.time.domain.CommentService;
import adventure.time.domain.Result;
import adventure.time.models.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService service;

    public CommentController(CommentService service){
        this.service = service;
    }

    @GetMapping
    public List<Comment> findAll(){
        return service.findAll();
    }

    @GetMapping("/commentId/{commentId}")
    public Comment findByCommentId(@PathVariable int commentId){
        return service.findById(commentId);
    }

    @GetMapping("/tripId/{tripId}")
    public List<Comment> findByTripId(@PathVariable int tripId) {
        return service.findByTripId(tripId);
    }

    @GetMapping("/profileId/{profileId}")
    public List<Comment> findByProfileId(@PathVariable int profileId) {
        return service.findByProfileId(profileId);
    }


    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Comment comment){
        Result<Comment> result = service.add(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Object> update(@PathVariable int commentId, @RequestBody Comment comment) {
        if (commentId != comment.getCommentId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Comment> result = service.update(comment);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponseController.build(result);
    }

    @DeleteMapping("/commentId/{commentId}")
    public ResponseEntity<Void> deleteById(@PathVariable int commentId) {
        if (service.deleteById(commentId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/tripId/{tripId}")
    public ResponseEntity<Void> deleteByTripId(@PathVariable int tripId) {
        if (service.deleteByTripId(tripId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}