package adventure.time.data;

import adventure.time.models.TripLocation;

public interface TripLocationRepository {

    boolean add(TripLocation tripLocation);

    boolean update(TripLocation tripLocation);

    boolean deleteByKey(int tripId, int locationId);
}
