package maafcraft.backend.service;

import maafcraft.backend.Utils.CustomValidation;
import maafcraft.backend.exception.CustomFieldError;
import maafcraft.backend.Utils.PhoneNumberUtils;
import maafcraft.backend.dto.request.UserRegistrationRequest;
import maafcraft.backend.dto.response.Response;
import maafcraft.backend.dto.response.UserResponse;
import maafcraft.backend.model.User;
import maafcraft.backend.model.UserRole;
import maafcraft.backend.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Autowired
    public UserServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<Response> registerNewUser(UserRegistrationRequest userRegistrationRequest,
                                                    BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return CustomFieldError.fieldErrorMessage(bindingResult);
            }

            String name = userRegistrationRequest.getName();
            String phone = PhoneNumberUtils.removePrefix(userRegistrationRequest.getPhone());
            String email = userRegistrationRequest.getEmail();
            String password = userRegistrationRequest.getPassword();
            boolean isEmailExist = isExistsUserEmail(email);
            boolean isPhoneExist = isExistsUserPhone(phone);
            if (isPhoneExist && isEmailExist) {
                return ResponseEntity.status(HttpStatus.OK).body(new
                        Response(false, "Email and Phone already exist!"));
            }

            if (isEmailExist) {
                return ResponseEntity.status(HttpStatus.OK).body(new
                        Response(false, "Email already exist!"));
            }

            if (isPhoneExist) {
                return ResponseEntity.status(HttpStatus.OK).body(new
                        Response(false, "Phone already exist!"));
            }

            User newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPhone(phone);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setLinkedIn(userRegistrationRequest.getLinkedin()!=null?userRegistrationRequest.getLinkedin():"");
            newUser.setAddress(userRegistrationRequest.getAddress());
            newUser.setCreatedAt(Instant.now());
            newUser.setUpdatedAt(Instant.now());

            List<UserRole> userRoles = new ArrayList<>();
            userRoles.add(UserRole.ROLE_USER);

            if (Objects.equals(email, adminEmail)) {
                userRoles.add(UserRole.ROLE_ADMIN);
            }

            newUser.setRoles(userRoles);
            User createdUser = userRepository.save(newUser);
            Map<String, String> mp = new HashMap<>();
            mp.put("InsertedID", createdUser.getId().toString());
            return new ResponseEntity<>(new Response(true,
                    "Registration Successful!", mp), HttpStatus.CREATED);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new
                    Response(false, "Internal Server Error for User Register!"));
        }
    }

    @Override
    public ResponseEntity<Response> findUserById(String id) {
        try {
            ObjectId userId = new ObjectId(id);
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return new ResponseEntity<>(new Response(false, "User not found!"),
                        HttpStatus.NOT_FOUND);
            }

            User user = userOptional.get();
            UserResponse userResponse = new UserResponse(user);

            return new ResponseEntity<>(new Response(true, "success", userResponse),
                    HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new Response(false, "Invalid ObjectId format!"),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Response> getUsers(String email, String phone, String brandId, int page, int perPage, Map<String, String> queryParams) {
        return null;
    }

//    @Override
//    public ResponseEntity<Response> getUsers(String email, String phone, int page, int perPage,
//                                      Map<String, String> queryParams) {
//        try {
//            Arrays.asList("page", "per_page", "email", "phone", "brand_id").forEach(queryParams.keySet()::remove);
//            if (!queryParams.isEmpty()) {
//                return new ResponseEntity<>(new Response(false, "Invalid request params! " +
//                        "Only valid params set (email, phone, brand_id, page, and per_page) " +
//                        "or any null params are allowed."),
//                        HttpStatus.BAD_REQUEST);
//            }
//            if (page < 0) {
//                page = 0;
//                perPage = 10;
//            }
//            if(perPage < 1){
//                perPage = 10;
//            }
//            long total = 0;
//            List<User> users = new ArrayList<>();
//            if(email != null && !email.isEmpty()){
//                if(!CustomValidation.isValidEmail(email)){
//                    return new ResponseEntity<>(new Response(false,
//                            "Invalid Email Format!"),
//                            HttpStatus.BAD_REQUEST);
//                }
//
//                Optional<User> user = userRepository.findByEmail(email);
//                if(user.isEmpty()){
//                    return new ResponseEntity<>(new Response(false,
//                            "User not found!"),
//                            HttpStatus.NOT_FOUND);
//                }
//
//                users.add(user.get());
//            } else if(phone != null && !phone.isEmpty()){
//                if(!CustomValidation.isValidBdPhoneNumber(phone)){
//                    return new ResponseEntity<>(new Response(false,
//                            "Invalid phone number format!"),
//                            HttpStatus.BAD_REQUEST);
//                }
//
//                if(!isExistsUserPhone(phone)){
//                    return new ResponseEntity<>(new Response(false,
//                            "User not found!"),
//                            HttpStatus.NOT_FOUND);
//                }
//
//                User user = userRepository.findByPhone(phone);
//                users.add(user);
//            }else {
//                Pageable pageable = PageRequest.of(page, perPage);
//                Page<User> brandPage = userRepository.findAll(pageable);
//                total = brandPage.getTotalElements();
//                users = brandPage.getContent();
//            }
//            if (users.isEmpty()) {
//                return new ResponseEntity<>(new Response(false, "No users found!"), HttpStatus.NOT_FOUND);
//            }
//
//            List<UserResponse> userResponses = users.stream()
//                    .map(UserResponse::new)
//                    .collect(Collectors.toList());
//            Map<String, Object> responseData = new HashMap<>();
//            responseData.put("data", userResponses);
//            responseData.put("total", total);
//
//            return new ResponseEntity<>(new Response(true, "success", responseData), HttpStatus.OK);
//        } catch (Exception ex) {
//            return new ResponseEntity<>(new Response(false,
//                    "Internal Server error for get users!"), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    @Override
    public boolean isExistsUserEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean isExistsUserPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    @Override
    public Optional<User> getFindByEmail(String email) {
        return userRepository.findByEmail(email);
    }



    @Override
    public ResponseEntity<Response> checkExistingUser(String email, String phone) {
        try {
            if ((email == null || email.isEmpty()) && (phone == null || phone.isEmpty())) {
                return new ResponseEntity<>(new Response(false,
                        "Email or phone required!"), HttpStatus.BAD_REQUEST);
            }

            if (email != null && phone != null) {
                return new ResponseEntity<>(new Response(false,
                        "Email or phone can not be submitted together!"), HttpStatus.BAD_REQUEST);
            }

            if (email != null) {
                if (!CustomValidation.isValidEmail(email)) {
                    return new ResponseEntity<>(new Response(false,
                            "Invalid email format!"), HttpStatus.BAD_REQUEST);
                }

                if (isExistsUserEmail(email)) {
                    return new ResponseEntity<>(new Response(false,
                            "Email already exist!"), HttpStatus.OK);
                }

                return new ResponseEntity<>(new Response(true,
                        "Email doesn't exist!"), HttpStatus.OK);
            }
            if (!CustomValidation.isValidBdPhoneNumber(phone)) {
                return new ResponseEntity<>(new Response(false,
                        "Invalid bd phone format!"), HttpStatus.BAD_REQUEST);
            }

            if (isExistsUserPhone(PhoneNumberUtils.removePrefix(phone))) {
                return new ResponseEntity<>(new Response(false,
                        "Phone already exist!"), HttpStatus.OK);
            }

            return new ResponseEntity<>(new Response(true,
                    "Phone doesn't exist!"), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new Response(false,
                    "Internal Server Error for check existing user!"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public boolean saveUser(User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean isValidRoles(List<Integer> roles) {
        if (roles == null || roles.isEmpty()) {
            return false;
        }

        for (Integer role : roles) {
            if (!(role == 1 || role == 2 || role == 4)) {
                return false;
            }
        }

        return true;
    }

    private UserRole getUserRoleByIndex(Integer index) {
        return switch (index) {
            case 1 -> UserRole.ROLE_USER;
            case 2 -> UserRole.ROLE_ADMIN;
            default -> throw new IllegalArgumentException("Invalid role index: " + index);
        };
    }
}
