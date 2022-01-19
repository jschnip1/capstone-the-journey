package adventure.time.data;

import adventure.time.models.Trip;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TripMapper implements RowMapper<Trip> {

    @Override
    public Trip mapRow(ResultSet resultSet, int i) throws SQLException {
        Trip trip = new Trip();
        trip.setTripId(resultSet.getInt("trip_id"));
        if (resultSet.getDate("start_time") != null) {
            trip.setStartTime(resultSet.getDate("start_time").toLocalDate());
        }
        if (resultSet.getDate("end_time") != null) {
            trip.setEndTime(resultSet.getDate("end_time").toLocalDate());
        }
        trip.setTripReview(resultSet.getInt("review"));
        trip.setTotalDistance(resultSet.getInt("total_distance"));
        trip.setName(resultSet.getString("name"));
        return trip;
    }
}
