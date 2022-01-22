package adventure.time.data.mappers;

import adventure.time.models.Profile;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ProfileMapper implements RowMapper<Profile> {

    @Override
    public Profile mapRow(ResultSet resultSet, int i) throws SQLException {
        Profile profile = new Profile();
        profile.setProfileId(resultSet.getInt("profile_id"));
        profile.setProfilePhoto(resultSet.getString("profile_photo"));
        profile.setProfileDescription(resultSet.getString("about_me"));
        profile.setName(resultSet.getString("name"));
        profile.setUserId(resultSet.getInt("app_user_id"));
        return profile;
    }
}