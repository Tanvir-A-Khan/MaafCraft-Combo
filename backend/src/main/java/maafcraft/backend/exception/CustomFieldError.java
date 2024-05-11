package maafcraft.backend.exception;

import maafcraft.backend.dto.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

public class CustomFieldError {

    public static ResponseEntity<Response> fieldErrorMessage(BindingResult bindingResult){
        StringBuilder errorMessage = new StringBuilder();
        int i = 0;
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            if(i > 0){
                errorMessage.append(", ");
            }

            String fieldName = fieldError.getField();
            String fieldErrorMessage = fieldError.getDefaultMessage();
            errorMessage.append(fieldName).append(": ").append(fieldErrorMessage);
            i++;
        }

        return new ResponseEntity<>(new Response(false,errorMessage.toString()),
                HttpStatus.OK);
    }
}
