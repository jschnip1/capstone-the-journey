package adventure.time.data;

import adventure.time.models.Profile;

public interface ProfileRepository {
    Profile findByUserId(int userId);
    Profile add(Profile profile);
    boolean update(Profile profile);
}
