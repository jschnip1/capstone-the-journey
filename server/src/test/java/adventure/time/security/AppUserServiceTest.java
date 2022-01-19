package adventure.time.security;

import adventure.time.App;
import adventure.time.data.AppUserRepository;
import adventure.time.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.ValidationException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    PasswordEncoder encoder;

    @MockBean
    AppUserRepository repository;

    @Test
    void loadUserByUsername() {
        AppUser mockOut = new AppUser(1, "test@test.com", "testpassword", false, List.of("ADMIN"));

        when(repository.findByUsername("test@test.com")).thenReturn(mockOut);

        UserDetails actual = service.loadUserByUsername("test@test.com");
        assertEquals(mockOut.getUsername(), actual.getUsername());
    }

    @Test
    void shouldCreate() {
        String username = "testCreate@test";
        String password = "Test@Password1";
        AppUser user = new AppUser(0, username, password, false, List.of("User"));

        when(repository.findByUsername(username)).thenReturn(null);
        when(encoder.encode(password)).thenReturn("KJLKJ@#)(!*LKFJLADSFUOAF&)(&");
        when(repository.create(user))
                .thenReturn(new AppUser(3, username, password, false, List.of("User")));

        AppUser actual = service.create("testCreate@test", password);

        assertEquals(username, actual.getUsername());
        assertEquals(3, actual.getAppUserId());
    }

    @Test
    void shouldNotCreateDuplicate() {
        AppUser mockOut = new AppUser(1, "testCreate@test.com", "testpassword", false, List.of("ADMIN"));

        when(repository.findByUsername("testCreate@test.com")).thenReturn(mockOut);

        try {
            AppUser actual = service.create("testCreate@test.com", "testpassword1#");
        } catch (ValidationException ex){
            assertEquals("username is already in use", ex.getMessage() );
        }


    }

    @Test
    void shouldNotCreateInvalidUsername() {
        try {
            AppUser actual = service.create("", "Test@Password1");
        } catch (ValidationException ex){
            assertEquals("username is required", ex.getMessage() );
        }

        try {
            AppUser actual = service.create("a".repeat(51), "Test@Password1");
        } catch (ValidationException ex){
            assertEquals("username must be less than 50 characters", ex.getMessage() );
        }

    }

    @Test
    void shouldNotCreateInvalidPassword() {
        try {
            AppUser actual = service.create("test@test.com", "p");
        } catch (ValidationException ex) {
            assertEquals("password must be at least 8 characters", ex.getMessage());
        }

        try {
            AppUser actual = service.create("test@test.com", "passwordTest");
        } catch (ValidationException ex) {
            assertEquals("password must contain a digit, a letter, and a non-digit/non-letter", ex.getMessage());
        }

    }
}