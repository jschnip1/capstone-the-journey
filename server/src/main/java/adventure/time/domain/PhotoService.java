package adventure.time.domain;

import adventure.time.data.PhotoRepository;
import adventure.time.models.Photo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {

    private final PhotoRepository repository;

    public PhotoService(PhotoRepository repository) {
        this.repository = repository;
    }

    public List<Photo> findAll() {
        return repository.findAll();
    }

    public Photo findById(int photoId) {
        return repository.findById(photoId);
    }

    public List<Photo> findByLocationId(int tripLocationId) {
        return repository.findByLocationId(tripLocationId);
    }

    public Result<Photo> add(Photo photo) {
        Result<Photo> result = validate(photo);
        if (!result.isSuccess()) {
            return result;
        }

        if (photo.getPhotoId() != 0) {
            result.addMessage("cannot have photoId for add", ResultType.INVALID);
            return result;
        }

        photo = repository.add(photo);
        result.setPayload(photo);
        return result;
    }

    public boolean deleteById(int photoId) {
        return repository.deleteById(photoId);
    }

    private Result<Photo> validate(Photo photo) {
        Result<Photo> result = new Result<>();
        if (photo == null) {
            result.addMessage("photo cannot be null", ResultType.INVALID);
            return result;
        }

        if (photo.getPhoto().isEmpty() || photo.getPhoto().isBlank()) {
            result.addMessage("photo url cannot be empty", ResultType.INVALID);
            return result;
        }

        if (photo.getTripLocationId() <= 0) {
            result.addMessage("location cannot be blank", ResultType.INVALID);
            return result;
        }

        return result;
    }
}
