package adventure.time.data.mappers;

import adventure.time.models.TripLocation;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TripLocationMapper implements RowMapper<TripLocation> {

    @Override
    public TripLocation mapRow(ResultSet resultSet, int i) throws SQLException {
        TripLocation tripLocation = new TripLocation();
        tripLocation.setTripLocationId(resultSet.getInt("trip_location_id"));
        tripLocation.setTripId(resultSet.getInt("trip_id"));
        tripLocation.setSortOrder(resultSet.getInt("sort_order"));

        LocationMapper locationMapper = new LocationMapper();
        tripLocation.setLocation(locationMapper.mapRow(resultSet, i));

        return tripLocation;
    }
}