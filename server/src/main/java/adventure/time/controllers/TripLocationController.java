package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.TripService;
import adventure.time.models.TripLocation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trip/location")
public class TripLocationController {

    //import trip service and then build normal controller
    //add/update/delete

    private final TripService service;

    public TripLocationController(TripService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody TripLocation tripLocation){
        Result<Void> result = service.addLocation(tripLocation);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @PutMapping("/{tripLocationId}")
    public ResponseEntity<Object> update(@PathVariable int tripLocationId, @RequestBody TripLocation tripLocation) {
        if (tripLocationId != tripLocation.getTripLocationId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Void> result = service.updateLocation(tripLocation);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponseController.build(result);
    }

    @DeleteMapping("/{tripId}/{locationId}")
    public ResponseEntity<Void> deleteById(@PathVariable int tripId, @PathVariable int locationId){
        if(service.deleteByKey(tripId, locationId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}