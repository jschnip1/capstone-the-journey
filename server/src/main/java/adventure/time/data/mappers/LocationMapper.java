package adventure.time.data.mappers;

import adventure.time.models.Location;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {

    @Override
    public Location mapRow(ResultSet resultSet, int i) throws SQLException {
        Location location = new Location();
        location.setLocationId(resultSet.getInt("location_id"));
        location.setLatitude(resultSet.getString("latitude"));
        location.setLongitude(resultSet.getString("longitude"));
        location.setName(resultSet.getString("name"));
        location.setType(resultSet.getString("type"));
        location.setPhotoUrl(resultSet.getString("photo_url"));
        return location;
    }
}