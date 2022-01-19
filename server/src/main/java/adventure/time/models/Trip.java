package adventure.time.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Trip {

    private int tripId;
    private LocalDate startTime;
    private LocalDate endTime;
    private int tripReview;
    private int totalDistance;
    private String name;
    private boolean disabled;
    private List<Item> itemList = new ArrayList<>();
    private List<Comment> commentList = new ArrayList<>();
    private List<TripLocation> locations = new ArrayList<>();

    public Trip() {
    }

    public Trip(int tripId, LocalDate startTime, LocalDate endTime, int tripReview, int totalDistance, String name) {
        this.tripId = tripId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.tripReview = tripReview;
        this.totalDistance = totalDistance;
        this.name = name;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public int getTripReview() {
        return tripReview;
    }

    public void setTripReview(int tripReview) {
        this.tripReview = tripReview;
    }

    public int getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(int totalDistance) {
        this.totalDistance = totalDistance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Item> getItemList() {
        return itemList;
    }

    public void setItemList(List<Item> itemList) {
        this.itemList = itemList;
    }

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public List<TripLocation> getLocations() {
        return locations;
    }

    public void setLocations(List<TripLocation> locations) {
        this.locations = locations;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }
}