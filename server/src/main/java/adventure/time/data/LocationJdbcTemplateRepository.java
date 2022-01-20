package adventure.time.data;

import adventure.time.data.mappers.LocationMapper;
import adventure.time.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;

public class LocationJdbcTemplateRepository implements LocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public Location findById(int locationId) {
        final String sql = "select location_id, latitude, longitude, name, type, photo" +
                "from location" +
                "where location_id = ?";

        Location location = jdbcTemplate.query(sql, new LocationMapper(), locationId).stream()
                .findFirst().orElse(null);

        return location;
    }

    @Override
    public Location add(Location location) {
        final String sql = "insert into location (latitude, longitude, name, type, photo) " +
                "values (?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, location.getLatitude());
            ps.setString(2, location.getLongitude());
            ps.setString(3, location.getName());
            ps.setString(4, location.getType());
            ps.setString(5, location.getPhotoUrl());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        location.setLocationId(keyHolder.getKey().intValue());
        return location;
    }

    @Override
    public boolean update(Location location) {
        final String sql = "update location set "
                + "latitude = ?, "
                + "longitude = ?, "
                + "name = ?, "
                + "type = ?, "
                + "photo = ? "
                + "where agent_id = ?;";

        return jdbcTemplate.update(sql,
                location.getLatitude(),
                location.getLongitude(),
                location.getName(),
                location.getType(),
                location.getPhotoUrl(),
                location.getLocationId()) > 0;
    }

    @Override
    public boolean deleteById(int locationId) {
        jdbcTemplate.update("delete from trip_location where location_id = ?;", locationId);
        return jdbcTemplate.update("delete from location where location_id = ?;", locationId) > 0;
    }
}
