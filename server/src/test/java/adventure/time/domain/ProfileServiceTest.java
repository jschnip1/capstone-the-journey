package adventure.time.domain;

import adventure.time.data.ProfileRepository;
import adventure.time.models.Profile;
import adventure.time.security.AppUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProfileServiceTest {

    @Autowired
    ProfileService service;

    @MockBean
    ProfileRepository repository;

    @Test
    void shouldFindByProfileId() {
        Profile mockOut = new Profile(2, null, "about me", "name", 1);

        when(repository.findByProfileId(2)).thenReturn(mockOut);

        Profile result = service.findByProfileId(2);

        assertNotNull(result);
    }

    @Test
    void shouldFindByUserId() {
        Profile mockOut = new Profile(2, null, "about me", "name", 1);

        when(repository.findByUserId(1)).thenReturn(mockOut);

        Profile result = service.findByUserId(1);

        assertNotNull(result);
    }

    @Test
    void shouldAdd() {
        Profile profile = new Profile(0, null, null, "Test", 1);

        when(repository.add(profile)).thenReturn(profile);

        Result<Profile> result = service.add(profile);

        assertTrue(result.isSuccess());
        assertEquals(profile, result.getPayload());
    }

    @Test
    void shouldNotAddWithInvalidNameAndId() {
        Profile profile = new Profile(1, null, null, "", 1);

        Result<Profile> result = service.add(profile);

        assertFalse(result.isSuccess());
        assertEquals("ProfileId must be 0 when adding", result.getMessages().get(0));
        assertEquals("Name is required", result.getMessages().get(1));

        //////////////////////////////////////////////////////////////////////////////////////////

        profile.setName("          ");

        result = service.add(profile);

        assertFalse(result.isSuccess());
        assertEquals("ProfileId must be 0 when adding", result.getMessages().get(0));
        assertEquals("Name is required", result.getMessages().get(1));
    }

    @Test
    void shouldUpdate() {
        Profile profile = new Profile(1, null, null, "Test", 1);

        when(repository.update(profile)).thenReturn(true);

        Result<Profile> result = service.update(profile);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdateNotFound() {
        Profile profile = new Profile(9999, null, null, "Test", 9999);

        when(repository.update(profile)).thenReturn(false);

        Result<Profile> result = service.update(profile);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals(String.format("profile with id: %s, not found", profile.getProfileId()), result.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateInvalid() {
        Profile profile = new Profile(0, null, null, "", 0);

        Result<Profile> result = service.update(profile);

        assertFalse(result.isSuccess());
        assertEquals(3, result.getMessages().size());
        assertEquals("ProfileId is required", result.getMessages().get(0));
        assertEquals("UserId is required", result.getMessages().get(1));
        assertEquals("Name is required", result.getMessages().get(2));

    ////////////////////////////////////////////////////////////////////

        profile.setName("          ");

        result = service.update(profile);

        assertFalse(result.isSuccess());
        assertEquals(3, result.getMessages().size());
        assertEquals("ProfileId is required", result.getMessages().get(0));
        assertEquals("UserId is required", result.getMessages().get(1));
        assertEquals("Name is required", result.getMessages().get(2));

    }
}