package adventure.time.data;

import adventure.time.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);
    @Transactional
    AppUser create(AppUser appUser);
    @Transactional
    void update(AppUser appUser);
}
