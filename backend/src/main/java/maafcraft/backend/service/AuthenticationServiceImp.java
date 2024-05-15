package maafcraft.backend.service;

import maafcraft.backend.dto.request.UserLoginRequest;
import maafcraft.backend.dto.response.JwtAuthenticationResponse;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.exception.CustomFieldError;
import maafcraft.backend.model.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.HashMap;

@Service
public class AuthenticationServiceImp implements AuthenticationService{

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationServiceImp(UserService userService, JwtService jwtService, AuthenticationManager
            authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public ResponseEntity<?> login(UserLoginRequest userLoginRequest, BindingResult bindingResult, HttpServletResponse
            httpServletResponse) {
        try {
            if(bindingResult.hasErrors()){
                return CustomFieldError.fieldErrorMessage(bindingResult);
            }

            String email = userLoginRequest.getEmail();
            String password = userLoginRequest.getPassword();


            if (!userService.isExistsUserEmail(email)) {
                return ResponseEntity.status(HttpStatus.OK).body(new
                        Response(false, "Email doesn't exist"));
            }

//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(email, password));

            User user = userService.getFindByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid email or password!"));

            String jwt = jwtService.generateToken(user);
            String refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);

            Cookie newRefreshTokenCookie = new Cookie("refreshToken", refreshToken);
            newRefreshTokenCookie.setHttpOnly(true);
            httpServletResponse.addCookie(newRefreshTokenCookie);

            return ResponseEntity.ok(jwtAuthenticationResponse);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new
                    Response(false, "Email or password doesn't match"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new
                    Response(false, "Internal Server Error for login!"));
        }
    }

    @Override
    public ResponseEntity<Response> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if(cookies == null){
            return new ResponseEntity<>(new Response(false, "User already logout!"), HttpStatus.OK);
        }

        for (Cookie cookie : request.getCookies()) {
            String cookieName = cookie.getName();
            Cookie cookieToDelete = new Cookie(cookieName, null);
            cookieToDelete.setMaxAge(0);
            response.addCookie(cookieToDelete);
        }

        return new ResponseEntity<>(new Response(true, "User logout Successfully!"), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> refreshToken(HttpServletRequest httpServletRequest) {
        Cookie[] cookies = httpServletRequest.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return new ResponseEntity<>(new Response(false, "No refresh token found!"),
                    HttpStatus.UNAUTHORIZED);
        }

        String userEmail = jwtService.extractUserName(refreshToken);
        User user = userService.getFindByEmail(userEmail).orElseThrow();

        if (jwtService.isTokenValid(refreshToken, user)) {
            var jwt = jwtService.generateToken(user);

            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
            jwtAuthenticationResponse.setToken(jwt);

            return ResponseEntity.ok(jwtAuthenticationResponse);
        }

        return new ResponseEntity<>(new Response(false, "Refresh token not valid!"),
                HttpStatus.NOT_FOUND);
    }
}
