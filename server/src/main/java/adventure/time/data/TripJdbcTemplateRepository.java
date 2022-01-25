package adventure.time.data;


import adventure.time.data.mappers.CommentMapper;
import adventure.time.data.mappers.ItemMapper;
import adventure.time.data.mappers.TripLocationMapper;
import adventure.time.data.mappers.TripMapper;
import adventure.time.models.Trip;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    // TODO
    // AddLocations method


    @Override
    public List<Trip> findAll() {
        final String sql = "select trip_id, start_time, end_time, review, total_distance, name, disabled from trip;";
        return jdbcTemplate.query(sql, new TripMapper());
    }



    @Override
    @Transactional
    public Trip findById(int tripId, boolean loadPhotos) {

        final String sql = "select trip_id, start_time, end_time, review, total_distance, name, disabled from trip where trip_id = ?;";

        Trip trip = jdbcTemplate.query(sql, new TripMapper(), tripId).stream().findFirst().orElse(null);

        if (trip != null) {
            addItems(trip);
            addComments(trip);
            addLocations(trip, loadPhotos);
        }

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

    private void addItems(Trip trip) {
        final String sql = "select item_id, name, trip_id, description, profile_id, quantity, is_packed "
                + "from item "
                + "where trip_id = ?;";

        var items = jdbcTemplate.query(sql, new ItemMapper(), trip.getTripId());
        trip.setItemList(items);
    }

    private void addComments(Trip trip) {
        final String sql = "select comment_id, trip_id, comment_body, profile_id "
                + "from comment "
                +"where trip_id = ?;";

        var comments = jdbcTemplate.query(sql, new CommentMapper(), trip.getTripId());
        trip.setCommentList(comments);
    }

    private void addLocations(Trip trip, boolean loadPhotos) {

        final String sql = "select tl.trip_location_id, tl.trip_id, tl.location_id, tl.sort_order, "
                + "l.latitude, l.longitude, l.name, l.type, l.photo_url "
                + "from trip_location tl "
                + "inner join location l on tl.location_id = l.location_id "
                + "where tl.trip_id = ?";

        // addPhotos sub of locations
        final String otherSql = "";

        var tripLocations = jdbcTemplate.query(sql, new TripLocationMapper(), trip.getTripId());
        trip.setLocations(tripLocations);
    }


}
