package adventure.time.data;

import adventure.time.models.TripLocation;
import org.springframework.jdbc.core.JdbcTemplate;

public class TripLocationJdbcTemplateRepository implements TripLocationRepository {

    private final JdbcTemplate jdbcTemplate;

    public TripLocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(TripLocation tripLocation) {
        return false;
    }

    @Override
    public boolean update(TripLocation tripLocation) {
        return false;
    }

    @Override
    public boolean deleteByKey(int tripId, int locationId) {
        return false;
    }

    // TODO
    // make addPhotos method use it where?
}
