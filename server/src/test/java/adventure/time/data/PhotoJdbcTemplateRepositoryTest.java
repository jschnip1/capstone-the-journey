package adventure.time.data;

import adventure.time.models.Photo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PhotoJdbcTemplateRepositoryTest {

    @Autowired
    PhotoJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Photo> photos = repository.findAll();
        assertNotNull(photos);
    }

    @Test
    void shouldFindById() {
        Photo photo = repository.findById(1);
        assertEquals(1, photo.getTripLocationId());
        assertEquals("This is a photo of cleveland", photo.getCaption());
    }

    @Test
    void shouldFindByTripLocationId() {
        List<Photo> photos = repository.findByLocationId(1);
        assertNotNull(photos);
    }

    @Test
    void shouldAdd() {
        Photo photo = makePhoto();
        Photo actual = repository.add(photo);
        assertNotNull(actual);
        assertEquals(3, actual.getPhotoId());
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(1));
    }

    private Photo makePhoto() {
        Photo photo = new Photo();
        photo.setPhoto("https://www.loveyourdog.com/wp-content/uploads/2020/04/Siberian-Husky-in-Snow-900x500.jpg");
        photo.setTripLocationId(1);
        photo.setCaption("Photo of dog");
        return photo;
    }

}