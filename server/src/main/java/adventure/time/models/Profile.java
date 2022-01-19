package adventure.time.models;

import java.sql.Blob;
import java.util.List;

public class Profile {

    private int profileId;
    private Blob profilePhoto;
    private String profileDescription;
    private int userId;
    private List<Comment> commentList;
    private List<Item> itemList;

    public Profile(int profileId, Blob profilePhoto, String profileDescription, int userId) {
        this.profileId = profileId;
        this.profilePhoto = profilePhoto;
        this.profileDescription = profileDescription;
        this.userId = userId;
    }

    public Profile() {

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

    public List<Comment> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public List<Item> getItemList() {
        return itemList;
    }

    public void setItemList(List<Item> itemList) {
        this.itemList = itemList;
    }
}