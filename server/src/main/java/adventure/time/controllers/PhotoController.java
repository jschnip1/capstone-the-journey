package adventure.time.controllers;

import adventure.time.domain.PhotoService;
import adventure.time.domain.Result;
import adventure.time.models.Photo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/photo")
public class PhotoController {

    private final PhotoService service;


    public PhotoController(PhotoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Photo> findAll() {
        return service.findAll();
    }

    @GetMapping("/photoId/{photoId}")
    public Photo findByPhotoId(@PathVariable int photoId) {
        return service.findById(photoId);
    }

    @GetMapping("/tripLocationId/{tripLocationId}")
    public List<Photo> findByLocationId(@PathVariable int tripLocationId) {
        return service.findByLocationId(tripLocationId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Photo photo) {
        Result<Photo> result = service.add(photo);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponseController.build(result);
    }

    @DeleteMapping("/{photoId}")
    public ResponseEntity<Void> deleteById(@PathVariable int photoId) {
        if (service.deleteById(photoId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}