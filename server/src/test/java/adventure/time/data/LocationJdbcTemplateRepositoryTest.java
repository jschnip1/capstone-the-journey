package adventure.time.data;

import adventure.time.models.Location;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LocationJdbcTemplateRepositoryTest {

    final static int NEXT_LOCATION_ID = 5;

    @Autowired
    LocationJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup(){
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        Location actual = repository.findById(1);
        assertNotNull(actual);
        assertEquals(1, actual.getLocationId());
        assertEquals("Akron,OH", actual.getName());
    }

    @Test
    void shouldAdd() {
        Location location = makeLocation();
        Location actual = repository.add(location);
        assertNotNull(actual);
        assertEquals(NEXT_LOCATION_ID, actual.getLocationId());
    }

    @Test
    void shouldUpdate() {
        Location location = makeLocation();
        location.setLocationId(5);
        assertTrue(repository.update(location));
        location.setLocationId(16);
        assertFalse(repository.update(location));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(4));
        assertFalse(repository.deleteById(5));
    }

    Location makeLocation() {
        Location location = new Location();
        location.setLatitude("29.8587 S");
        location.setLongitude("31.0218 E");
        location.setName("Durban, South Africa");
        location.setType("city");
        location.setPhotoUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Durban_TownHall.jpg/1200px-Durban_TownHall.jpg");
        return location;
    }
}