package maafcraft.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import maafcraft.backend.model.User;
import maafcraft.backend.model.UserRole;


import java.time.Instant;
import java.util.List;

public class UserResponse {

    private String id;
    private String name;
    private String email;
    private String phone;
    private List<UserRole> roles;
    @JsonProperty("linkedin")
    private String linkedIn;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;

    public UserResponse(){
        
    }

    public UserResponse(User user) {
        this.id = user.getId().toHexString();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.roles = user.getRoles();
        this.linkedIn = user.getLinkedIn();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public List<UserRole> getRoles() {
        return roles;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRoles(List<UserRole> roles) {
        this.roles = roles;
    }

    public String getLinkedIn() {
        return linkedIn;
    }

    public void setLinkedIn(String linkedIn) {
        this.linkedIn = linkedIn;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
