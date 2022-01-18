package adventure.time.models;

public class Comment {

    private int commentId;
    private int tripId;
    private String commentBody;
    private int profileId;

    public Comment(int commentId, int tripId, String commentBody, int profileId) {
        this.commentId = commentId;
        this.tripId = tripId;
        this.commentBody = commentBody;
        this.profileId = profileId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }
}