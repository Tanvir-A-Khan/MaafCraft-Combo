package maafcraft.backend.controller;

import maafcraft.backend.dto.request.UserLoginRequest;
import maafcraft.backend.dto.request.UserRegistrationRequest;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.service.AuthenticationService;
import maafcraft.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("${FRONTEND_BASE_URL}")
public class AuthController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    /**
     * Registers a new user.
     * This method is mapped to handle HTTP POST requests to "/register".
     *
     * @param userRegistrationRequest The request containing the data for user registration.
     * @param bindingResult           The result of the validation performed on the user registration request.
     * @return ResponseEntity containing a Response object indicating the result of the registration process.
     */
    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody @Valid UserRegistrationRequest userRegistrationRequest,
                                             BindingResult bindingResult) {
        System.out.println( userRegistrationRequest.toString());
        return userService.registerNewUser(userRegistrationRequest, bindingResult);
//        return new ResponseEntity<>(new Response(true, "Working"), HttpStatus.OK);
    }

    /**
     * Logs in a user.
     * This method is mapped to handle HTTP POST requests to "/login".
     *
     * @param userLoginRequest      The request containing the user's login credentials.
     * @param bindingResult         The result of the validation performed on the login request.
     * @param httpServletResponse  The HTTP servlet response object.
     * @return ResponseEntity containing the response for the login attempt.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginRequest userLoginRequest, BindingResult bindingResult,
                                   HttpServletResponse httpServletResponse) {
        return authenticationService.login(userLoginRequest, bindingResult, httpServletResponse);
    }

    /**
     * Refreshes the authentication token.
     * This method is mapped to handle HTTP POST requests to "/refresh".
     *
     * @param httpServletRequest The HTTP servlet request object.
     * @return ResponseEntity containing the response for the token refresh request.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpServletRequest) {
        return authenticationService.refreshToken(httpServletRequest);
    }

    /**
     * Checks if a user with the specified email or phone number already exists.
     * This method is mapped to handle HTTP GET requests to "/check-existing-user".
     *
     * @param email The email address of the user to check for existence (optional).
     * @param phone The phone number of the user to check for existence (optional).
     * @return ResponseEntity containing a Response object indicating the result of the existence check.
     */
    @GetMapping("/check-existing-user")
    public ResponseEntity<Response> checkExistingUser(@RequestParam(value = "email", required = false) String email,
                                                      @RequestParam(value = "phone", required = false) String phone) {
        return userService.checkExistingUser(email, phone);
    }

    /**
     * Logs out the current user.
     * This method is mapped to handle HTTP POST requests to "/user-logout".
     *
     * @param request  The HTTP servlet request object.
     * @param response The HTTP servlet response object.
     * @return ResponseEntity containing a Response object indicating the result of the logout process.
     */
    @PostMapping("/user-logout")
    public ResponseEntity<Response> logout(HttpServletRequest request, HttpServletResponse response) {
        return authenticationService.logout(request, response);
    }
}
