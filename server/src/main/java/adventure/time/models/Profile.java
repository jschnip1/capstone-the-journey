package adventure.time.models;

import java.sql.Blob;
import java.util.List;

public class Profile {

    private int profileId;
    private Blob profilePhoto;
    private String profileDescription;
    private String name;
    private int userId;
    private List<Trip> tripList;

    public Profile(int profileId, Blob profilePhoto, String profileDescription,String name, int userId) {
        this.profileId = profileId;
        this.profilePhoto = profilePhoto;
        this.profileDescription = profileDescription;
        this.name = name;
        this.userId = userId;
    }

    public Profile() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    public Blob getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(Blob profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getProfileDescription() {
        return profileDescription;
    }

    public void setProfileDescription(String profileDescription) {
        this.profileDescription = profileDescription;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Trip> getTripList() {
        return tripList;
    }

    public void setTripList(List<Trip> tripList) {
        this.tripList = tripList;
    }
}