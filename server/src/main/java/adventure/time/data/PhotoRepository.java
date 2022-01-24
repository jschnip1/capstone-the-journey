package adventure.time.data;

import adventure.time.models.Photo;

import java.util.List;

public interface PhotoRepository {

    List<Photo> findAll();

    Photo findById(int photoId);

    List<Photo> findByLocationId(int tripLocationId);

    Photo add(Photo photo);

    boolean deleteById(int photoId);
}
