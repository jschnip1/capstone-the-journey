package adventure.time.data;

import adventure.time.models.TripLocation;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TripLocationJdbcTemplateRepository implements TripLocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public TripLocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public boolean add(TripLocation tripLocation) {

        final String sql = "insert into trip_location (trip_location_id, location_id, trip_id, sort_order) values (?,?,?,?);";

        return jdbcTemplate.update(sql,
                tripLocation.getTripLocationId(),
                tripLocation.getLocation().getLocationId(),
                tripLocation.getTripId(),
                tripLocation.getSortOrder()) > 0;
    }

    @Override
    public boolean update(TripLocation tripLocation) {

        final String sql = "update trip_location set "
                + "sort_order = ? "
                + "where trip_id = ? and location_id = ?;";

        return jdbcTemplate.update(sql,
                tripLocation.getSortOrder(),
                tripLocation.getTripId(),
                tripLocation.getLocation().getLocationId()) > 0;
    }

    @Override
    public boolean deleteByKey(int tripId, int locationId) {

        final String sql = "delete from trip_location where trip_id = ? and location_id = ?;";
        return jdbcTemplate.update(sql, tripId, locationId) > 0;
    }

}
