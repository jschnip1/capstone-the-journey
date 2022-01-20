package adventure.time.data;

import adventure.time.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindByUsername() {
        AppUser actual = repository.findByUsername("john@smith.com");

        assertEquals("john@smith.com", actual.getUsername());
    }

    @Test
    void shouldCreate() {
        AppUser expected = new AppUser(3, "test@test.com", "testPassword", false, new ArrayList<>());
        AppUser actual = repository.create(expected);

        assertEquals(expected.getAppUserId(), expected.getAppUserId());
        assertEquals(expected.getUsername(), actual.getUsername());
    }

    @Test
    void shouldNotCreateNull() {
        AppUser actual = repository.create(null);

        assertNull(actual);
    }

    @Test
    void shouldUpdate() {
        AppUser user = new AppUser(1, "test@smith.com", "", false, List.of("ADMIN"));
        repository.update(user);
    }
}