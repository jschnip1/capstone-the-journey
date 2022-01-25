package adventure.time.domain;

import adventure.time.data.ItemRepository;
import adventure.time.models.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item findById(int itemId){
        return repository.findById(itemId);
    }

    public List<Item> findByTripId(int tripId){
        return repository.findByTripId(tripId);
    }

    public List<Item> findByProfileId(int profileId){
        return repository.findByProfileId(profileId);
    }

    public Result<Item> add(Item item){
        Result<Item> result = validation(item);

        if(item.getItemId() != 0){
            result.addMessage("itemId must be 0 when adding", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        Item itemResult = repository.add(item);
        result.setPayload(itemResult);
        return result;
    }

    public Result<Item> update(Item item){
        Result<Item> result = validation(item);

        if(item.getItemId() <= 0){
            result.addMessage("itemId is required", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        if(!repository.update(item)){
            result.addMessage(String.format("Item with itemId: %d NOT FOUND", item.getItemId()), ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Item> deleteById(int itemId){
        Result<Item> result = new Result<>();

        if(itemId <= 0){
            result.addMessage("invalid itemId given", ResultType.INVALID);
            return result;
        }

        if (!repository.deleteById(itemId)){
            result.addMessage(String.format("Item with itemId: %d NOT FOUND", itemId), ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<Item> validation(Item item) {
        Result<Item> result = new Result<>();

        if(Validations.isNullOrBlank(item.getItemName())){
            result.addMessage("Name is required", ResultType.INVALID);
        }

        if(item.getTripId() <= 0){
            result.addMessage("Trip id is invalid", ResultType.INVALID);
        }

        if(item.getItemQuantity() < 1){
            result.addMessage("Quantity must be at least 1", ResultType.INVALID);
        }

        return result;
    }
}
