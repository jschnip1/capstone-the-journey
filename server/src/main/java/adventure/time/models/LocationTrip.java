package adventure.time.models;

public class LocationTrip {

    private int tripLocationId;
    private int tripId;
    private Trip trip;
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

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
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