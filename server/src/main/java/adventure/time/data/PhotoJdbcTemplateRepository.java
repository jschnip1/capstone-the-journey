package adventure.time.data;

import adventure.time.data.mappers.PhotoMapper;
import adventure.time.models.Photo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class PhotoJdbcTemplateRepository implements PhotoRepository {

    private final JdbcTemplate  jdbcTemplate;

    public PhotoJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Photo> findAll() {

        final String sql = "select photo_id, photo, trip_location_id, caption from photo;";

        return jdbcTemplate.query(sql, new PhotoMapper());
    }

    @Override
    public Photo findById(int photoId) {

        final String sql = "select photo_id, photo, trip_location_id, caption from photo where photo_id = ?;";

        return jdbcTemplate.query(sql, new PhotoMapper(), photoId).stream().findFirst().orElse(null);
    }

    @Override
    public List<Photo> findByLocationId(int tripLocationId) {

        final String sql = "select photo_id, photo, trip_location_id, caption from photo where trip_location_id = ?;";

        return jdbcTemplate.query(sql, new PhotoMapper(), tripLocationId);
    }

    @Override
    public Photo add(Photo photo) {

        final String sql = "insert into photo (photo, trip_location_id, caption) values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, photo.getPhoto());
            ps.setInt(2, photo.getTripLocationId());
            ps.setString(3, photo.getCaption());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        photo.setPhotoId(keyHolder.getKey().intValue());
        return photo;
    }

    @Override
    public boolean deleteById(int photoId) {
        return jdbcTemplate.update("delete from photo where photo_id = ?;", photoId) > 0;
    }
}
