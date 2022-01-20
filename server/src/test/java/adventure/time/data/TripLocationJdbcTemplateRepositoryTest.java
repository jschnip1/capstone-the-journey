package adventure.time.data;

import adventure.time.models.Location;
import adventure.time.models.TripLocation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TripLocationJdbcTemplateRepositoryTest {

    @Autowired
    TripLocationRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        TripLocation tripLocation = makeTripLocation();
        boolean actual = repository.add(tripLocation);
        assertTrue(actual);
    }

    @Test
    void shouldUpdate() {
        TripLocation tripLocation = makeTripLocation();
        tripLocation.setTripLocationId(1);
        boolean actual = repository.update(tripLocation);
        assertTrue(actual);
    }

    @Test
    void shouldNotUpdate() {
        TripLocation tripLocation = makeTripLocation();
        tripLocation.setTripId(100);
        boolean actual = repository.update(tripLocation);
        assertFalse(actual);
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(1,1));
    }

    private TripLocation makeTripLocation() {
        TripLocation tripLocation = new TripLocation();
        Location location = new Location();
        location.setLocationId(1);
        tripLocation.setLocation(location);
        tripLocation.setTripId(1);
        tripLocation.setSortOrder(1);

        return tripLocation;
    }

}