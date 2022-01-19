package adventure.time.models;


import java.sql.Blob;

public class Photo {

    private int photoId;
    private Blob photo;
    private int tripLocationId;
    private String caption;

    public Photo(int photoId, Blob photo, int tripLocationId, String caption) {
        this.photoId = photoId;
        this.photo = photo;
        this.tripLocationId = tripLocationId;
        this.caption = caption;
    }

    public Photo() {

    }

    public int getPhotoId() {
        return photoId;
    }

    public void setPhotoId(int photoId) {
        this.photoId = photoId;
    }

    public Blob getPhoto() {
        return photo;
    }

    public void setPhoto(Blob photo) {
        this.photo = photo;
    }

    public int getTripLocationId() {
        return tripLocationId;
    }

    public void setTripLocationId(int tripLocationId) {
        this.tripLocationId = tripLocationId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}