package adventure.time.data;

import adventure.time.models.Profile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProfileJdbcTemplateRepositoryTest {

    @Autowired
    ProfileJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }


    @Test
    void shouldFindByProfileId() {
        Profile profile = repository.findByProfileId(1);

        assertEquals("John Smith", profile.getName());
        assertEquals(1, profile.getUserId());
        assertEquals(1, profile.getTripList().size());
        assertEquals("Major Ohio Cities", profile.getTripList().get(0).getName());
    }

    @Test
    void shouldFindByUserId() {
        Profile profile = repository.findByUserId(1);

        assertEquals("John Smith", profile.getName());
        assertEquals(1, profile.getUserId());
        assertEquals(1, profile.getTripList().size());
        assertEquals("Major Ohio Cities", profile.getTripList().get(0).getName());
    }

    @Test
    void shouldFindByTripId() {
        Profile profile = repository.findByTripId(1);

        assertEquals("John Smith", profile.getName());
        assertEquals(1, profile.getUserId());
        assertEquals(1, profile.getTripList().size());
        assertEquals("Major Ohio Cities", profile.getTripList().get(0).getName());
    }

    @Test
    void shouldAdd() {
        Profile expected = new Profile(3, null, "about me", "test", 1);

        Profile actual = repository.add(expected);

        assertNotNull(actual);
        assertEquals(expected.getProfileId(), actual.getProfileId());
        assertEquals(expected.getName(), actual.getName());

    }

    @Test
    void shouldNotAddNull() {
        assertNull(repository.add(null));
    }

    @Test
    void shouldUpdate() {
        Profile profile = new Profile(2, null, "about me", "Test Update", 2);

        assertTrue(repository.update(profile));
    }

    @Test
    void shouldNotUpdateNull() {
        assertFalse(repository.update(null));
    }
}