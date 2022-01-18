package adventure.time.models;

public class Photo {

    private int photoId;
    private String photo;
    private int tripLocationId;
    private String caption;

    public Photo(int photoId, String photo, int tripLocationId, String caption) {
        this.photoId = photoId;
        this.photo = photo;
        this.tripLocationId = tripLocationId;
        this.caption = caption;
    }

    public int getPhotoId() {
        return photoId;
    }

    public void setPhotoId(int photoId) {
        this.photoId = photoId;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
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