package adventure.time.domain;

import adventure.time.data.TripLocationRepository;
import adventure.time.data.TripRepository;
import adventure.time.models.Trip;
import adventure.time.models.TripLocation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    //TODO
    // # of locations validation

    private final TripRepository tripRepository;

    private final TripLocationRepository tripLocationRepository;

    public TripService(TripRepository tripRepository, TripLocationRepository tripLocationRepository) {
        this.tripRepository = tripRepository;
        this.tripLocationRepository = tripLocationRepository;
    }

    public List<Trip> findAll() {
        return tripRepository.findAll();
    }

    public Trip findById(int tripId, boolean loadPhotos) {
        return tripRepository.findById(tripId, loadPhotos);
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

        trip = tripRepository.add(trip);
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

        if (!tripRepository.update(trip)) {
            String msg = String.format("tripId: %s, not found", trip.getTripId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int tripId) {
        return tripRepository.deleteById(tripId);
    }

    public Result<Void> addLocation(TripLocation tripLocation) {
        Result<Void> result = validate(tripLocation);
        if(!result.isSuccess()) {
            return result;
        }

        if (!tripLocationRepository.add(tripLocation)) {
            result.addMessage("Trip not added", ResultType.INVALID);
        }

        return result;
    }

    public Result<Void> updateLocation(TripLocation tripLocation) {
        Result<Void> result = validate(tripLocation);
        if(!result.isSuccess()) {
            return result;
        }

        if (!tripLocationRepository.update(tripLocation)) {
            String msg = String.format("update failed for tripId = %s and locationId = %s not found.");
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteByKey(int tripId, int locationId) {
        return tripLocationRepository.deleteByKey(tripId, locationId);
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

//        if (trip.getLocations().size() < 2) {
//            result.addMessage("Must have at least two locations for a trip", ResultType.INVALID);
//            return result;
//        }

        return result;
    }


    private Result<Void> validate(TripLocation tripLocation) {
        Result<Void> result = new Result<>();

        if (tripLocation == null) {
            result.addMessage("TripLocation cannot be null", ResultType.INVALID);
            return result;
        }

        if (tripLocation.getLocation() == null) {
            result.addMessage("Location cannot be null", ResultType.INVALID);
            return result;
        }

        if (tripLocation.getTripId() < 1) {
            result.addMessage("tripId must be greater than 0.", ResultType.INVALID);
            return result;
        }

        if (tripLocation.getSortOrder() < 1) {
            result.addMessage("sortOrder must be greater than 0", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
