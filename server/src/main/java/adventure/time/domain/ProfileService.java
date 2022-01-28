package adventure.time.domain;

import adventure.time.data.ProfileRepository;
import adventure.time.models.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public Profile findByProfileId(int profileId) {
        return repository.findByProfileId(profileId);
    }

    public Profile findByUserId(int userId) {
        return repository.findByUserId(userId);
    }

    public Profile findByTripId(int tripId) {
        return repository.findByTripId(tripId);
    }

    public Result<Profile> add(Profile profile){
        Result<Profile> result = new Result<>();

        if(profile.getProfileId() != 0) {
            result.addMessage("ProfileId must be 0 when adding", ResultType.INVALID);
        }

        if(Validations.isNullOrBlank(profile.getName())){
            result.addMessage("Name is required", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        result.setPayload(repository.add(profile));
        return result;
    }

    public Result<Profile> update(Profile profile) {
        Result<Profile> result = new Result<>();

        if(profile.getProfileId() <= 0){
            result.addMessage("ProfileId is required", ResultType.INVALID);
        }

        if(profile.getUserId() <= 0){
            result.addMessage("UserId is required", ResultType.INVALID);
        }

        if(Validations.isNullOrBlank(profile.getName())){
            result.addMessage("Name is required", ResultType.INVALID);
        }

        if(!result.isSuccess()){
            return result;
        }

        if(!repository.update(profile)){
            String msg = String.format("profile with id: %s, not found", profile.getProfileId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }
}
