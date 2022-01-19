package adventure.time.models;

import java.util.List;

public class LocationTrip {

    private int locationId;
    private Trip trip;
    private int tripLocationId;
    private int sortOrder;
    private List<Photo> photoList;

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public int getTripLocationId() {
        return tripLocationId;
    }

    public void setTripLocationId(int tripLocationId) {
        this.tripLocationId = tripLocationId;
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