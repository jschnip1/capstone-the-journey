package adventure.time.data;

import adventure.time.models.Trip;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class TripJdbcTemplateRepository implements TripRepository {

    private final JdbcTemplate jdbcTemplate;

    public TripJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public List<Trip> findAll() {
        final String sql = "select trip_id, start_time, end_time, review, total_distance, name, disabled from trip;";
        return jdbcTemplate.query(sql, new TripMapper());
    }

    // Transactional with Locations, items, comments?
    @Override
    public Trip findById(int tripId) {

        final String sql = "select trip_id, start_time, end_time, review, total_distance, name, disabled from trip where trip_id = ?;";

        Trip trip = jdbcTemplate.query(sql, new TripMapper(), tripId).stream().findFirst().orElse(null);

        // if not null add list of locations, items, and comments to trip

        return trip;
    }

    @Override
    public Trip add(Trip trip) {

        final String sql = "insert into trip (start_time, end_time, review, total_distance, name, disabled) values (?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
        PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        ps.setDate(1, trip.getStartTime() == null ? null : Date.valueOf(trip.getStartTime()));
        ps.setDate(2, trip.getEndTime() == null ? null : Date.valueOf(trip.getEndTime()));
        ps.setInt(3, trip.getTripReview());
        ps.setInt(4, trip.getTotalDistance());
        ps.setString(5, trip.getName());
        ps.setBoolean(6, trip.isDisabled());
        return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        trip.setTripId(keyHolder.getKey().intValue());
        return trip;
    }

    @Override
    public boolean update(Trip trip) {

        final String sql = "update trip set "
                + "start_time = ?,"
                + "end_time = ?,"
                + "review = ?,"
                + "total_distance = ?,"
                + "name = ?,"
                + "disabled = ? "
                + "where trip_id = ?;";

        return jdbcTemplate.update(sql,
                trip.getStartTime(),
                trip.getEndTime(),
                trip.getTripReview(),
                trip.getTotalDistance(),
                trip.getName(),
                trip.isDisabled(),
                trip.getTripId()) > 0;
    }

    @Override
    public boolean deleteById(int tripId) {

        final String sql = "update trip set "
                + " disabled = 1 "
                + "where trip_id = ?";

        return jdbcTemplate.update(sql,
                tripId) > 0;
    }

    // AddLocations, Additems, AddComments method
}
