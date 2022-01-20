package adventure.time.data;

import adventure.time.data.mappers.AppUserMapper;
import adventure.time.data.mappers.ProfileMapper;
import adventure.time.data.mappers.TripMapper;
import adventure.time.models.Profile;
import adventure.time.models.Trip;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Repository
public class ProfileJdbcTemplateRepository implements ProfileRepository{

    private final JdbcTemplate jdbcTemplate;

    public ProfileJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Profile findByUserId(int userId) {
        final String sql = "select profile_id, profile_photo, about_me, `name`, app_user_id " +
                "from profile " +
                "where app_user_id = ?";

        Profile profile = jdbcTemplate.query(sql, new ProfileMapper(),userId)
                .stream()
                .findFirst().orElse(null);

        if(profile != null){
            addTrips(profile);
        }

        return profile;
    }

    @Override
    public Profile add(Profile profile) {
        if(profile == null){
            return null;
        }

        final String sql = "insert into profile (profile_photo, about_me, `name`, app_user_id) values (?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setBlob(1, profile.getProfilePhoto());
            ps.setString(2, profile.getProfileDescription());
            ps.setString(3, profile.getName());
            ps.setInt(4, profile.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        profile.setProfileId(keyHolder.getKey().intValue());
        return profile;
    }

    @Override
    public boolean update(Profile profile) {
        if (profile == null){
            return false;
        }

        final String sql = "update profile set " +
                "profile_photo = ?, about_me = ?, `name` = ? " +
                "where profile_id = ?;";

        return jdbcTemplate.update(sql,
                profile.getProfilePhoto(),
                profile.getProfileDescription(),
                profile.getName(),
                profile.getProfileId()) > 0;
    }

    private void addTrips(Profile profile) {
        final String sql = "select" +
                " t.trip_id, t.start_time, t.end_time, t.review, t.total_distance, t.`name`, t.`disabled` " +
                " from trip t" +
                " inner join profile_trip tp on t.trip_id = tp.trip_id" +
                " where profile_id = ?";

        var trips = jdbcTemplate.query(sql, new TripMapper(), profile.getProfileId());
        profile.setTripList(trips);

    }

}
