package adventure.time.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
public class JwtConverter {

    public String getTokenFromUser(User principal) {
        return "null";
    }
}