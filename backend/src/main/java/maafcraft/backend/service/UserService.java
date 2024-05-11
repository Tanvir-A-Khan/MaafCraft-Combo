package maafcraft.backend.service;

import maafcraft.backend.dto.request.UserRegistrationRequest;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Map;
import java.util.Optional;


@Service
public interface UserService {

    ResponseEntity<Response> registerNewUser(UserRegistrationRequest userRegistrationRequest,
                                             BindingResult bindingResult);

    ResponseEntity<Response> findUserById(String id);

    ResponseEntity<Response> getUsers(String email, String phone, String brandId, int page, int perPage,
                               Map<String, String> queryParams);


    boolean isExistsUserEmail(String email);

    boolean isExistsUserPhone(String phone);

    Optional<User> getFindByEmail(String email);

    ResponseEntity<Response> checkExistingUser(String email, String phone);

    boolean saveUser(User user);

}

