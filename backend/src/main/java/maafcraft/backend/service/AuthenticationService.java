package maafcraft.backend.service;

import maafcraft.backend.dto.request.UserLoginRequest;
import maafcraft.backend.dto.response.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public interface AuthenticationService {

    ResponseEntity<?> refreshToken(HttpServletRequest httpServletRequest);

    ResponseEntity<?> login(UserLoginRequest userLoginRequest,
                            BindingResult bindingResult,
                            HttpServletResponse httpServletResponse);

    ResponseEntity<Response> logout(HttpServletRequest request, HttpServletResponse response);
}
