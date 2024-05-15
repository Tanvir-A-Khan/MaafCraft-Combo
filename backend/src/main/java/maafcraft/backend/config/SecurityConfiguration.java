package maafcraft.backend.config;

import maafcraft.backend.model.UserRole;
import maafcraft.backend.service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserAuthenticationService userAuthenticationService;
    @Value("${FRONTEND_BASE_URL}")
    private String FRONTEND_BASE_URL;

    @Autowired
    public SecurityConfiguration(JwtAuthenticationFilter jwtAuthenticationFilter, UserAuthenticationService
            userAuthenticationService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userAuthenticationService = userAuthenticationService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(corsCustomizer())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/register",
                                "/login",
                                "/user-logout",
                                "/refresh",
                                "/products/**",
                                "/cart/**",
                                "/message",
                                "/check-existing-user")
                        .permitAll()
                        .requestMatchers("/admin/**")
                        .hasAnyAuthority(UserRole.ROLE_ADMIN.name())
                        .anyRequest()
                        .authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(
                        jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userAuthenticationService.userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    private Customizer<CorsConfigurer<HttpSecurity>> corsCustomizer() {
        return cors -> {
            cors.configurationSource(request -> getCorsConfiguration());
        };
    }

    private CorsConfiguration getCorsConfiguration() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(FRONTEND_BASE_URL);
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        return configuration;
    }
}
