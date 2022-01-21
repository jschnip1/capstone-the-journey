package adventure.time.domain;

import adventure.time.data.CommentRepository;
import adventure.time.models.Comment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class CommentServiceTest {

    @Autowired
    CommentService service;

    @MockBean
    CommentRepository repository;

    @Test
    void shouldFindAll() {
        List<Comment> expected = List.of(makeComment());
        when(repository.findAll()).thenReturn(expected);
        List<Comment> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Comment expected = makeComment();
        when(repository.findById(1)).thenReturn(expected);
        Comment actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindByTripId() {
        List<Comment> expected = List.of(makeComment());
        when(repository.findByTripId(1)).thenReturn(expected);
        List<Comment> actual = service.findByTripId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindByProfileId() {
        List<Comment> expected = List.of(makeComment());
        when(repository.findByProfileId(1)).thenReturn(expected);
        List<Comment> actual = service.findByProfileId(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() {
        Comment comment = makeComment();
        Comment mockOut = makeComment();

        when(repository.add(comment)).thenReturn(mockOut);

        Result<Comment> actual = service.add(comment);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() {
        Comment comment = makeComment();
        // comment is null
        Comment fakeComment = null;
        Result<Comment> actual = service.add(fakeComment);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("comment cannot be null", actual.getMessages().get(0));
        // commentBody is empty or blank
        comment.setCommentBody("");
        actual = service.add(comment);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("commentBody cannot be empty", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Comment comment = makeComment();
        comment.setCommentId(1);
        when(repository.update(comment)).thenReturn(true);
        Result<Comment> actual = service.update(comment);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Comment comment = makeComment();
        comment.setCommentBody("");
        Result<Comment> actual = service.update(comment);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("commentBody cannot be empty", actual.getMessages().get(0));
    }

    @Test
    void ShouldDeleteById() {
        Comment comment = makeComment();
        comment.setCommentId(1);
        when(repository.deleteById(1)).thenReturn(true);
        boolean actual = service.deleteById(1);
        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteById() {
        Comment comment = makeComment();
        comment.setCommentId(10);
        when(repository.deleteById(10)).thenReturn(false);
        boolean actual = service.deleteById(10);
        assertFalse(actual);
    }

    @Test
    void shouldDeleteByTripId() {
        Comment comment = makeComment();
        comment.setCommentId(1);
        when(repository.deleteByTripId(1)).thenReturn(true);
        boolean actual = service.deleteByTripId(1);
        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteByTripIdThatDoesntExist() {
        Comment comment = makeComment();
        comment.setCommentId(10);
        when(repository.deleteByTripId(10)).thenReturn(false);
        boolean actual = service.deleteByTripId(10);
        assertFalse(actual);
    }

    private Comment makeComment() {
        Comment comment = new Comment();
        comment.setCommentBody("Sample comment");
        comment.setProfileId(1);
        comment.setTripId(1);

        return comment;
    }
}