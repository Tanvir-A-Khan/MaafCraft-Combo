package maafcraft.backend.exception;

import maafcraft.backend.dto.response.Response;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

@ControllerAdvice
@Validated
public class GlobalExceptionHandler {

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<Response> handleMissingServletRequestParameterException(
            MissingServletRequestParameterException ex) {
        String errorMessage = "Required parameter '" + ex.getParameterName() + "' is missing!";
        return new ResponseEntity<>(new Response(false, errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingRequestHeaderException.class)
    public ResponseEntity<Response> handleMissingRequestHeader(MissingRequestHeaderException ex) {
        String errorMessage = "Required header " + ex.getHeaderName() + " is missing!";
        return new ResponseEntity<>(new Response(false, errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Response> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        String errorMessage = "Failed to convert parameter '" + ex.getName() + "' with value '" + ex.getValue() +
                "' to required type '" + Objects.requireNonNull(ex.getRequiredType()).getSimpleName() + "'";
        return new ResponseEntity<>(new Response(false, errorMessage), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Response> handleAccessDeniedException(AccessDeniedException ex) {
        String errorMessage = "Access denied: " + ex.getMessage();
        return new ResponseEntity<>(new Response(false, errorMessage), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<Response> handleDateTimeParseException(DateTimeParseException ex) {
        return new ResponseEntity<>(new Response(false, "Invalid date/time format"),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response> handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        Set<ConstraintViolation<?>> violations = ex.getConstraintViolations();
        for (ConstraintViolation<?> violation : violations) {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        }

        return new ResponseEntity<>(new Response(false, errors.toString()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response> handleUnknownExceptionBadRequest(Exception ex) {
        return new ResponseEntity<>(new Response(false, "Bad request!"),
                HttpStatus.BAD_REQUEST);
    }
}
