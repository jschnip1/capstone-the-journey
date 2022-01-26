package adventure.time.models;

public class S3Information {

    private final String url;
    private final String eTag;

    public S3Information(String url, String eTag) {
        this.url = url;
        this.eTag = eTag;
    }

    public String getUrl() {
        return url;
    }

    public String geteTag() {
        return eTag;
    }
}
