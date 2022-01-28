package adventure.time.data;

import adventure.time.models.Trip;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TripJdbcTemplateRepositoryTest {

    @Autowired
    TripJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Trip> trips = repository.findAll();
        assertNotNull(trips);
    }

    @Test
    void shouldFindById() {
        Trip trip = repository.findById(1);
        assertEquals(1, trip.getTripId());
        assertEquals(3, trip.getTripReview());
        assertEquals(165, trip.getTotalDistance());
        assertNotNull(trip.getLocations().get(1).getPhotoList());
        assertFalse(trip.isDisabled());
    }

    @Test
    void shouldAdd() {
        Trip trip = makeTrip();
        Trip actual = repository.add(trip, 1);
        assertNotNull(actual);
        assertEquals(5, actual.getTripReview());
    }

    @Test
    void shouldUpdate() {
        Trip trip = makeTrip();
        trip.setTripId(2);
        assertTrue(repository.update(trip));
    }

    @Test
    void shouldNotUpdate() {
        Trip trip = makeTrip();
        trip.setTripId(10);
        assertFalse(repository.update(trip));
    }

    @Test
    void shouldDisable() {
        assertTrue(repository.deleteById(1));
    }

    @Test
    void shouldNotDisableNotExisting() {
        assertFalse(repository.deleteById(10));
    }

    private Trip makeTrip() {
        Trip trip = new Trip();
        trip.setStartTime(LocalDate.of(2022, 2, 10));
        trip.setEndTime(LocalDate.of(2022, 2, 12));
        trip.setTripReview(5);
        trip.setTotalDistance(200);
        trip.setName("Trip to Canada");
        trip.setDisabled(false);

        return trip;
    }
}