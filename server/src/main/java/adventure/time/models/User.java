package adventure.time.models;

import java.util.List;

public class User {

    private int userId;
    private String email;
    private String password;
    private boolean disabled;
    private List<Trip> tripList;

    public User(int userId, String email, String password) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.disabled = disabled;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public List<Trip> getTripList() {
        return tripList;
    }

    public void setTripList(List<Trip> tripList) {
        this.tripList = tripList;
    }
}