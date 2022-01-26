package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.ProfileService;
import adventure.time.models.AppUser;
import adventure.time.models.Profile;
import adventure.time.security.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;
    private final AppUserService appUserService;

    public ProfileController(ProfileService service, AppUserService appUserService){
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping("profileId/{profileId}")
    public Profile findById(@PathVariable int profileId){
        return service.findByProfileId(profileId);

    }

    @GetMapping("username/{username}")
    public Profile findById(@PathVariable String username){
//        System.out.println(service.findByUserId(1));
        int userId = appUserService.getUserIdByUsername(username);
        Profile result = service.findByUserId(userId);
        if(result == null){
            return new Profile();
        }
        return result;

    }

    @PostMapping("/{username}")
    public ResponseEntity<Object> add(@PathVariable String username, @RequestBody Profile profile){
        profile.setUserId(appUserService.getUserIdByUsername(username));
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