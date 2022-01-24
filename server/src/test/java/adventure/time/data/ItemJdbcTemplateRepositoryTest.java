package adventure.time.data;

import adventure.time.models.Item;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ItemJdbcTemplateRepositoryTest {

    @Autowired
    ItemJdbcTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindById() {
        Item item = repository.findById(1);

        assertEquals("Sunscreen", item.getItemName());
        assertEquals(2, item.getTripId());
    }

    @Test
    void shouldNotFindById() {
        Item item = repository.findById(1000);

        assertNull(item);
    }

    @Test
    void shouldFindByTripId() {
        List<Item> items = repository.findByTripId(2);

        assertEquals(1, items.size());
        assertEquals(2, items.get(0).getTripId());
    }

    @Test
    void shouldNotFindByTripId() {
        List<Item> items = repository.findByTripId(2000);

        assertEquals(0, items.size());
    }

    @Test
    void shouldFindByProfileId() {
        List<Item> items = repository.findByProfileId(1);

        assertEquals(1, items.size());
        assertEquals("Snacks", items.get(0).getItemName());
    }

    @Test
    void shouldNotFindByProfileId() {
        List<Item> items = repository.findByProfileId(100000);

        assertEquals(0, items.size());
    }

    @Test
    void shouldAdd() {
        Item item = new Item(0, "Coat", 2, "",2, 1,false);

        Item result = repository.add(item);

        assertEquals(item.getItemName(), result.getItemName());
        assertEquals(3, result.getItemId());
    }

    @Test
    void shouldNotAddNull() {
        assertNull(repository.add(null));
    }

    @Test
    void shouldUpdate() {
        Item item = new Item(1, "Coat", 1, "It is going to be cold",1, 1,false);

        assertTrue(repository.update(item));
    }

    @Test
    void shouldNotUpdate() {
        Item item = new Item(1000, "Coat", 1, "It is going to be cold",1, 1,false);

        assertFalse(repository.update(item));
    }

    @Test
    void shouldDeleteById() {
        assertTrue(repository.deleteById(2));
    }

    @Test
    void shouldNotDeleteById() {
        assertFalse(repository.deleteById(200000));
    }
}