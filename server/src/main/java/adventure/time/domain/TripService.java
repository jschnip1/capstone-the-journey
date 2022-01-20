package adventure.time.domain;

import adventure.time.data.TripRepository;
import adventure.time.models.Trip;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    //TODO
    // add TripLocation repository to dependencies
    // add locations, items and comments to trip (may only need to be done in repository)

    private final TripRepository repository;

    public TripService(TripRepository repository) {
        this.repository = repository;
    }

    public List<Trip> findAll() {
        return repository.findAll();
    }

    public Trip findById(int tripId) {
        return repository.findById(tripId);
    }

    public Result<Trip> add(Trip trip) {
        Result<Trip> result = validate(trip);
        if(!result.isSuccess()) {
            return result;
        }

        if (trip.getTripId() != 0) {
            result.addMessage("tripId cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        trip = repository.add(trip);
        result.setPayload(trip);
        return result;
    }

    public Result<Trip> update(Trip trip) {
        Result<Trip> result = validate(trip);
        if (!result.isSuccess()) {
            return result;
        }

        if (trip.getTripId() <= 0) {
            result.addMessage("tripId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(trip)) {
            String msg = String.format("tripId: %s, not found", trip.getTripId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int tripId) {
        return repository.deleteById(tripId);
    }

    private Result<Trip> validate(Trip trip) {
        Result<Trip> result = new Result<>();
        if (trip == null) {
            result.addMessage("Trip cannot be null", ResultType.INVALID);
            return result;
        }

        if (trip.getName() == null || trip.getName().isBlank() || trip.getName().isEmpty()) {
            result.addMessage("Must name trip", ResultType.INVALID);
            return result;
        }

        if (trip.getStartTime().isAfter(trip.getEndTime())) {
            result.addMessage("End date cannot be before start date", ResultType.INVALID);
            return result;
        }

        // add validation for having at least two locations
//        if (trip.getLocations().size() < 2) {
//            result.addMessage("Must have at least two locations for a trip", ResultType.INVALID);
//            return result;
//        }

        return result;
    }
}
