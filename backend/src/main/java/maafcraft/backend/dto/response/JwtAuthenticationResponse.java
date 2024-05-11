package maafcraft.backend.dto.response;

public class JwtAuthenticationResponse {

    private String token;

    public JwtAuthenticationResponse() {
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
