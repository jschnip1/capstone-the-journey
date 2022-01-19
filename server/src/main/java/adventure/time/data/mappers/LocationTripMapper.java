package adventure.time.data.mappers;

import adventure.time.data.TripMapper;
import adventure.time.models.LocationTrip;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationTripMapper implements RowMapper<LocationTrip>{


    @Override
    public LocationTrip mapRow(ResultSet resultSet, int i) throws SQLException {
        LocationTrip locationTrip = new LocationTrip();
        locationTrip.setLocationId(resultSet.getInt("location_id"));
        locationTrip.setTripLocationId(resultSet.getInt("trip_location_id"));
        locationTrip.setSortOrder(resultSet.getInt("sort_order"));

        TripMapper tripMapper = new TripMapper();
        locationTrip.setTrip(tripMapper.mapRow(resultSet, i));

        return locationTrip;
    }
}