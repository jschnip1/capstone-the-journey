package adventure.time.data.mappers;

import adventure.time.models.Photo;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PhotoMapper implements RowMapper<Photo> {

    @Override
    public Photo mapRow(ResultSet resultSet, int i) throws SQLException {
        Photo photo = new Photo();
        photo.setPhoto(resultSet.getString("photo"));
        photo.setPhotoId(resultSet.getInt("photo_id"));
        photo.setCaption(resultSet.getString("caption"));
        photo.setTripLocationId(resultSet.getInt("trip_location_id"));
        return photo;
    }
}