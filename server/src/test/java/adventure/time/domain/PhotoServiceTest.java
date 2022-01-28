package adventure.time.domain;

import adventure.time.data.PhotoRepository;
import adventure.time.models.Photo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class PhotoServiceTest {

    @Autowired
    PhotoService service;

    @MockBean
    PhotoRepository repository;

    @Test
    void shouldFindAll() {
        List<Photo> expected = List.of(makePhoto());
        when(repository.findAll()).thenReturn(expected);
        List<Photo> actual = service.findAll();
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindById() {
        Photo expected = makePhoto();
        when(repository.findById(1)).thenReturn(expected);
        Photo actual = service.findById(1);
        assertEquals(expected, actual);
    }

    @Test
    void shouldFindByLocationId() {
        List<Photo> expected = List.of(makePhoto());
        when(repository.findByLocationId(1)).thenReturn(expected);
        List<Photo> actual = service.findByLocationId(1);
        assertEquals(expected, actual);

    }

    @Test
    void shouldAdd() {
        Photo photo = makePhoto();
        Photo mockOut = makePhoto();
        when(repository.add(photo)).thenReturn(mockOut);
        Result<Photo> actual = service.add(photo);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    void shouldNotAddInvalid() {
        Photo noPhoto = null;
        Result<Photo> actual = service.add(noPhoto);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("photo cannot be null", actual.getMessages().get(0));
        // cannot add with no photo url
        Photo photo = makePhoto();
        photo.setPhoto("");
        actual = service.add(photo);
        assertEquals(ResultType.INVALID, actual.getType());
        assertEquals("photo url cannot be empty", actual.getMessages().get(0));
    }

    @Test
    void shouldDeleteById() {
        Photo photo = makePhoto();
        photo.setPhotoId(1);
        when(repository.deleteById(1)).thenReturn(true);
        boolean actual = service.deleteById(1);
        assertTrue(actual);
    }

    @Test
    void shouldNotDeleteNotExisting() {
        Photo photo = makePhoto();
        photo.setPhotoId(10);
        when(repository.deleteById(10)).thenReturn(false);
        boolean actual = service.deleteById(10);
        assertFalse(actual);
    }

    private Photo makePhoto() {
        Photo photo = new Photo();
        photo.setPhoto("https://www.loveyourdog.com/wp-content/uploads/2020/04/Siberian-Husky-in-Snow-900x500.jpg");
        photo.setTripLocationId(1);
        photo.setCaption("Photo of dog");
        return photo;
    }
}