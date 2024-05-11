package maafcraft.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    @JsonProperty(value = "result")
    private boolean result;
    @JsonProperty(value = "message")
    private String message;
    @JsonProperty(value = "data")
    private Object data;

    public Response() {
    }

    public Response(Object data) {
        this.data = data;
    }

    public Response(boolean result, String message, Object data) {
        this.result = result;
        this.message = message;
        this.data = data;
    }
    public Response(boolean result, String message) {
        this.result = result;
        this.message = message;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}