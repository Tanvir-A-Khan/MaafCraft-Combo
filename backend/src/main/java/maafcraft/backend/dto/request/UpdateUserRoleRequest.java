package maafcraft.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class UpdateUserRoleRequest {

    @JsonProperty("user_id")
    private String userId;
    private List<Integer> roles;

    public UpdateUserRoleRequest(){

    }
    public UpdateUserRoleRequest(String userId, List<Integer> roles) {
        this.userId = userId;
        this.roles = roles;
    }

    public String getUserId() {
        return userId;
    }
    public List<Integer> getRoles() {
        return roles;
    }
}
