package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.ProfileService;
import adventure.time.models.AppUser;
import adventure.time.models.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service){ this.service = service; }

    @GetMapping("/{userId}")
    public Profile findByUserId(@PathVariable int userId){
        return service.findByUserId(userId);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Object> add(@RequestBody Profile profile){
        Result<Profile> result = service.add(profile);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> update(@PathVariable int userId, @RequestBody Profile profile) {
        if (userId != profile.getUserId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Profile> result = service.update(profile);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponseController.build(result);
    }

}