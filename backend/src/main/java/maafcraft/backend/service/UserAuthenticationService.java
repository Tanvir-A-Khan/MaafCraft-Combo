package maafcraft.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserAuthenticationService {

    UserDetailsService userDetailsService();
}
