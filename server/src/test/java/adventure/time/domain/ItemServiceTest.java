package adventure.time.domain;

import adventure.time.data.ItemRepository;
import adventure.time.models.Item;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class ItemServiceTest {

    @Autowired
    ItemService service;

    @MockBean
    ItemRepository repository;

    @Test
    void findById() {
        Item mockOut = new Item (1, "coat", 1, null, 0, 1, false);

        when(repository.findById(1)).thenReturn(mockOut);

        Item actual = service.findById(1);

        assertEquals(mockOut.getItemName(), actual.getItemName());
        assertEquals(mockOut.getTripId(), actual.getTripId());
        assertEquals(mockOut.getProfileId(), actual.getProfileId());
    }

    @Test
    void findByTripId() {
        List<Item> items = List.of(
                new Item (1, "coat", 1, null, 0, 1, false),
                new Item (3, "socks", 1, null, 0, 3, true)
        );

        when(repository.findByTripId(1)).thenReturn(items);

        List<Item> actual = service.findByTripId(1);

        assertEquals(items.size(), actual.size());
        assertEquals(items.get(0).getItemName(), actual.get(0).getItemName());
    }

    @Test
    void findByProfileId() {
        List<Item> items = List.of(
                new Item (1, "coat", 1, null, 3, 1, false),
                new Item (3, "socks", 1, null, 3, 3, true)
        );

        when(repository.findByProfileId(3)).thenReturn(items);

        List<Item> actual = service.findByProfileId(3);

        assertEquals(items.size(), actual.size());
        assertEquals(items.get(0).getItemName(), actual.get(0).getItemName());
    }

    @Test
    void shouldAdd() {
        Item mockOut = new Item (0, "coat", 1, null, 0, 1, false);

        when(repository.add(mockOut)).thenReturn(mockOut);

        Result<Item> actual = service.add(mockOut);

        assertEquals(mockOut.getItemName(), actual.getPayload().getItemName());
        assertEquals(mockOut.getTripId(), actual.getPayload().getTripId());
        assertEquals(mockOut.getProfileId(), actual.getPayload().getProfileId());
    }

    @Test
    void shouldNotAddInvalid() {
        Item item = new Item (1, "", 0, null, 0, 0, false);

        Result<Item> actual = service.add(item);

        assertFalse(actual.isSuccess());
        assertEquals(4, actual.getMessages().size());
        assertEquals("Name is required", actual.getMessages().get(0));
        assertEquals("Trip id is invalid", actual.getMessages().get(1));
        assertEquals("Quantity must be at least 1", actual.getMessages().get(2));
        assertEquals("itemId must be 0 when adding", actual.getMessages().get(3));


        //////////////////////////////////////////////////////////////////

        item.setItemName("        ");

        actual = service.add(item);

        assertFalse(actual.isSuccess());
        assertEquals(4, actual.getMessages().size());
        assertEquals("Name is required", actual.getMessages().get(0));
        assertEquals("Trip id is invalid", actual.getMessages().get(1));
        assertEquals("Quantity must be at least 1", actual.getMessages().get(2));
        assertEquals("itemId must be 0 when adding", actual.getMessages().get(3));
    }

    @Test
    void shouldUpdate() {
        Item mockOut = new Item (1, "coat", 1, null, 0, 1, false);

        when(repository.update(mockOut)).thenReturn(true);

        Result<Item> actual = service.update(mockOut);

        assertTrue(actual.isSuccess());
    }

    @Test
    void shouldNotUpdateNotFound() {
        Item mockOut = new Item (10000, "coat", 1, null, 0, 1, false);

        when(repository.update(mockOut)).thenReturn(false);

        Result<Item> actual = service.update(mockOut);

        assertFalse(actual.isSuccess());
        assertEquals(1, actual.getMessages().size());
        assertEquals(String.format("Item with itemId: %d NOT FOUND", mockOut.getItemId()), actual.getMessages().get(0));
    }

    @Test
    void shouldNotUpdateInvalid() {
        Item item = new Item (0, "", 0, null, 0, 0, false);

        Result<Item> actual = service.update(item);

        assertFalse(actual.isSuccess());
        assertEquals(4, actual.getMessages().size());
        assertEquals("Name is required", actual.getMessages().get(0));
        assertEquals("Trip id is invalid", actual.getMessages().get(1));
        assertEquals("Quantity must be at least 1", actual.getMessages().get(2));
        assertEquals("itemId is required", actual.getMessages().get(3));

        ////////////////////////////////////////

        item.setItemName("       ");

        actual = service.update(item);

        assertFalse(actual.isSuccess());
        assertEquals(4, actual.getMessages().size());
        assertEquals("Name is required", actual.getMessages().get(0));
        assertEquals("Trip id is invalid", actual.getMessages().get(1));
        assertEquals("Quantity must be at least 1", actual.getMessages().get(2));
        assertEquals("itemId is required", actual.getMessages().get(3));
    }

    @Test
    void shouldDeleteById() {
        when(repository.deleteById(1)).thenReturn(true);

        Result<Item> result = service.deleteById(1);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotDeleteByIdNotFound() {
        when(repository.deleteById(1)).thenReturn(true);

        int itemId = 1000;

        Result<Item> result = service.deleteById(itemId);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals(String.format("Item with itemId: %d NOT FOUND", itemId), result.getMessages().get(0));
    }

    @Test
    void shouldNotDeleteByIdInvalid() {
        int itemId = 0;

        Result<Item> result = service.deleteById(itemId);

        assertFalse(result.isSuccess());
        assertEquals(1, result.getMessages().size());
        assertEquals("invalid itemId given", result.getMessages().get(0));
    }

}