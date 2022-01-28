package adventure.time.domain;

import adventure.time.data.LocationRepository;
import adventure.time.models.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository repository;

    public LocationService(LocationRepository repository){
        this.repository = repository;
    }

    public Location findById(int locationId){
        return repository.findById(locationId);
    }

    public Result<Location> add(Location location){
        Result<Location> result = validate(location);
        if(!result.isSuccess()){
            return result;
        }

        if (location.getLocationId() != 0){
            result.addMessage("cannot have locationId for add", ResultType.INVALID);
        }

        location = repository.add(location);
        result.setPayload(location);
        return result;
    }

    public Result<Location> update(Location location){
        Result<Location> result = validate(location);
        if (!result.isSuccess()) {
            return result;
        }

        if (location.getLocationId() <= 0) {
            result.addMessage("locationId must be set for 'update' operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(location)) {
            String msg = String.format("locationId: %s, not found", location.getLocationId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int locationId){
        return repository.deleteById(locationId);
    }

    public Result<Location> validate(Location location){
        Result<Location> result = new Result<>();
        if (location.getName() == null) {
            result.addMessage("location name cannot be null", ResultType.INVALID);
            return result;
        }

        if (location.getLatitude().isBlank() || location.getLatitude().isEmpty() ||
                location.getLongitude().isBlank() || location.getLongitude().isEmpty()) {
            result.addMessage("coordinates cannot be empty", ResultType.INVALID);
            return result;
        }

        return result;

    }
}
