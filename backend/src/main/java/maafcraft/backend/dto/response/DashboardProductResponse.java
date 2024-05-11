package maafcraft.backend.dto.response;

public class DashboardProductResponse {
    private String id;
    private String item;
    private String model;
    private String images;
    private String material;
    private String description;
    private Double pricePerPiece;
    private Double rating = 0.0;



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public Double getPricePerPiece() {
        return pricePerPiece;
    }

    public void setPricePerPiece(Double pricePerPiece) {
        this.pricePerPiece = pricePerPiece;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

}
