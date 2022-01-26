package adventure.time.domain;

import adventure.time.data.TripRepository;
import adventure.time.models.Location;
import adventure.time.models.Trip;
import adventure.time.models.TripLocation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class TripServiceTest {

    @Autowired
    TripService service;

    @MockBean
    TripRepository repository;

    @Test
    void shouldFindAll() {
        List<Trip> expected = List.of(makeTrip());
        when(repository.findAll()).thenReturn(expected);
        List<Trip> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Trip expected = makeTrip();
        when(repository.findById(1)).thenReturn(expected);
        Trip actual = service.findById(1, false);
        assertEquals(expected, actual);
    }

    @Test
    void shouldAdd() {
        Trip trip = makeTrip();
        Trip mockOut = makeTrip();

        when(repository.add(trip)).thenReturn(mockOut);

        Result<Trip> actual = service.add(trip);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() {
        Trip trip = makeTrip();
        // trip is null
        Trip nothing = null;
        Result<Trip> actual = service.add(nothing);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Trip cannot be null", actual.getMessages().get(0));
        // trip name is null or blank
        trip.setName(null);
        actual = service.add(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Must name trip", actual.getMessages().get(0));

        trip.setName(" ");
        actual = service.add(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Must name trip", actual.getMessages().get(0));
    }

    @Test
    void shouldNotAddWithEndDateBeforeStartDate() {
        Trip trip = makeTrip();
        trip.setStartTime(LocalDate.of(2022,2,1));
        trip.setEndTime(LocalDate.of(2021,2,2));
        Result<Trip> actual = service.add(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("End date cannot be before start date", actual.getMessages().get(0));
    }

    @Test
    void shouldUpdate() {
        Trip trip = makeTrip();
        trip.setTripId(1);
        when(repository.update(trip)).thenReturn(true);
        Result<Trip> actual = service.update(trip);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Trip trip = makeTrip();
        trip.setTripId(1);
        // trip is null
        Trip nothing = null;
        Result<Trip> actual = service.update(nothing);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Trip cannot be null", actual.getMessages().get(0));
        // trip name is null or blank
        trip.setName(null);
        actual = service.update(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Must name trip", actual.getMessages().get(0));

        trip.setName(" ");
        actual = service.update(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("Must name trip", actual.getMessages().get(0));

        trip.setName("Trip to Canada");
        trip.setStartTime(LocalDate.of(2022,2,1));
        trip.setEndTime(LocalDate.of(2021,2,2));
        actual = service.update(trip);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("End date cannot be before start date", actual.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateNotExisting() {
        Trip trip = makeTrip();
        trip.setTripId(23);

        when(repository.update(trip)).thenReturn(false);
        Result<Trip> actual = service.update(trip);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDisableExisting() {
        Trip trip = makeTrip();
        trip.setTripId(1);
        when(repository.deleteById(1)).thenReturn(true);
        boolean actual = service.deleteById(1);
        assertTrue(actual);
    }

    @Test
    void shouldNotDisableNotExisting() {
        Trip trip = makeTrip();
        trip.setTripId(10);
        when(repository.deleteById(10)).thenReturn(false);
        boolean actual = service.deleteById(10);
        assertFalse(actual);
    }

    @Test
    void shouldNotDisableIfStartDateHasPassed() {
        Trip trip = makeTrip();
        trip.setTripId(3);
        trip.setStartTime(LocalDate.of(2021,12,30));
        when(repository.findById(3)).thenReturn(trip);
        boolean actual = service.deleteById(3);
        assertFalse(actual);
    }

    private Trip makeTrip() {
        Trip trip = new Trip();
        trip.setStartTime(LocalDate.of(2023, 2, 10));
        trip.setEndTime(LocalDate.of(2023, 2, 12));
        trip.setTripReview(5);
        trip.setTotalDistance(200);
        trip.setName("Trip to Canada");
        trip.setDisabled(false);

        return trip;
    }


}