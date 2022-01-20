package adventure.time.data;

import adventure.time.models.Comment;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommentJdbcTemplateRepositoryTest {

    @Autowired
    CommentJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Comment> comments = repository.findAll();
        assertNotNull(comments);
    }

    @Test
    void shouldFindById() {
        Comment comment = repository.findById(1);
        assertEquals(1, comment.getCommentId());
        assertEquals(1, comment.getTripId());
        assertEquals("I think John is ugly", comment.getCommentBody());
        assertEquals(2, comment.getProfileId());
    }

    @Test
    void shouldFindByTripId() {
        List<Comment> comments = repository.findByTripId(1);
        assertNotNull(comments);
    }

    @Test
    void shouldFindByProfileId() {
        List<Comment> comments = repository.findByProfileId(1);
        assertNotNull(comments);
    }

    @Test
    void shouldAdd() {
        Comment comment = makeComment();
        Comment actual = repository.add(comment);
        assertNotNull(actual);
        assertEquals(3, actual.getCommentId());
    }

    @Test
    void shouldUpdate() {
        Comment comment = makeComment();
        comment.setCommentId(2);
        assertTrue(repository.update(comment));
    }

    @Test
    void shouldNotUpdate() {
        Comment comment = makeComment();
        comment.setCommentId(10);
        assertFalse(repository.update(comment));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(2));
    }

    @Test
    void shouldNotDeleteByIdThatDoesntExist() {
        assertFalse(repository.deleteById(100));
    }

    private Comment makeComment() {
        Comment comment = new Comment();
        comment.setCommentBody("Sample comment");
        comment.setProfileId(1);
        comment.setTripId(1);

        return comment;
    }

}