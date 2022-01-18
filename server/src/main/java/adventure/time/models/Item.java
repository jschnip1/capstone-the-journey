package adventure.time.models;

public class Item {

    private int itemId;
    private String itemName;
    private int tripId;
    private String itemDescription;
    private int profileId;
    private int itemQuantity;
    private boolean isPacked;

    public Item(int itemId, String itemName, int tripId, String itemDescription, int profileId, int itemQuantity, boolean isPacked) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.tripId = tripId;
        this.itemDescription = itemDescription;
        this.profileId = profileId;
        this.itemQuantity = itemQuantity;
        this.isPacked = isPacked;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public boolean isPacked() {
        return isPacked;
    }

    public void setPacked(boolean packed) {
        isPacked = packed;
    }
}