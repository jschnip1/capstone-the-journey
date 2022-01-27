package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.TripService;
import adventure.time.models.Trip;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripService service;

    public TripController(TripService service){
        this.service = service;
    }

    @GetMapping
    public List<Trip> findAll(){
        return service.findAll();
    }

    @GetMapping("/{tripId}")
    public Trip findByTripId(@PathVariable int tripId){
        return service.findById(tripId, true);
    }

    @PostMapping("/{profileId}")
    public ResponseEntity<Object> add(@RequestBody Trip trip, @PathVariable int profileId){
        Result<Trip> result = service.add(trip, profileId);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @PutMapping("/edit/{tripId}")
    public ResponseEntity<Object> update(@PathVariable int tripId, @RequestBody Trip trip) {
        if (tripId != trip.getTripId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Trip> result = service.update(trip);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponseController.build(result);
    }

    @PutMapping("/disable/{tripId}")
    public ResponseEntity<Void> deleteById(@PathVariable int tripId) {
        if (service.deleteById(tripId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}