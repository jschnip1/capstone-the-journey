package adventure.time.controllers;

import adventure.time.domain.ItemService;
import adventure.time.domain.Result;
import adventure.time.models.Item;
import adventure.time.models.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping("/{itemId}")
    public Item findByItemId(@PathVariable int itemId){
        return service.findById(itemId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Item item) {
        Result<Item> result = service.add(item);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<Object> update(@PathVariable int itemId, @RequestBody Item item) {
        if (itemId != item.getItemId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Item> result = service.update(item);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponseController.build(result);
    }
}