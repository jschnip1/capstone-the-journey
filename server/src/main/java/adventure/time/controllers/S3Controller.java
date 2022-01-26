package adventure.time.controllers;


import adventure.time.domain.S3Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
public class S3Controller {

    private final S3Service service;

    public S3Controller(S3Service service) {
        this.service = service;
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> upload(@RequestParam("image")MultipartFile image){
        return new ResponseEntity<>(service.uploadFile(image), HttpStatus.OK);
    }
}
