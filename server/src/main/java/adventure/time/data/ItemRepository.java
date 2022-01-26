package adventure.time.data;

import adventure.time.models.Item;

import java.util.List;

public interface ItemRepository {
    Item findById(int itemId);
    List<Item> findByTripId(int tripId);
    List<Item> findByProfileId(int profileId);
    Item add(Item item);
    boolean update(Item item);
    boolean deleteById(int itemId);
}
