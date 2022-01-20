package adventure.time.data;

import adventure.time.models.Trip;

import java.util.List;

public interface TripRepository {

    List<Trip> findAll();

    Trip findById(int tripId);

    Trip add(Trip trip);

    boolean update(Trip trip);

    boolean deleteById(int tripId);
}
