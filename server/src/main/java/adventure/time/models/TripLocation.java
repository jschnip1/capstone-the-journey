package adventure.time.models;

public class TripLocation {

    private int tripLocationId;
    private int tripId;
    private Location location;
    private int sortOrder;
    private List<Photo> photoList;

    public int getTripLocationId() {
        return tripLocationId;
    }

    public void setTripLocationId(int tripLocationId) {
        this.tripLocationId = tripLocationId;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(int sortOrder) {
        this.sortOrder = sortOrder;
    }

    public List<Photo> getPhotoList() {
        return photoList;
    }

    public void setPhotoList(List<Photo> photoList) {
        this.photoList = photoList;
    }
}