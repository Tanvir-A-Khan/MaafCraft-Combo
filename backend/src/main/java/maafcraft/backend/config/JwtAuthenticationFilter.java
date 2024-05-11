package maafcraft.backend.config;

import io.jsonwebtoken.ExpiredJwtException;
import maafcraft.backend.service.JwtService;
import maafcraft.backend.service.UserAuthenticationService;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserAuthenticationService userAuthenticationService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService, UserAuthenticationService userAuthenticationService) {
        this.jwtService = jwtService;
        this.userAuthenticationService = userAuthenticationService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        try {
            if (isLoginRoute(request)) {
                filterChain.doFilter(request, response);
                return;
            }

            if (StringUtils.isEmpty(authHeader) || !org.apache.commons.lang3.StringUtils.startsWith(authHeader,
                    "Bearer")) {
                filterChain.doFilter(request, response);
                return;
            }

            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUserName(jwt);

            if (StringUtils.isNotEmpty(userEmail) && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userAuthenticationService.userDetailsService().loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );

                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    securityContext.setAuthentication(token);
                    SecurityContextHolder.setContext(securityContext);
                }
            }
        } catch (ExpiredJwtException ex) {
            Duration duration = Duration.between(ex.getClaims().getExpiration().toInstant(), java.time.Instant.now());
            long hours = duration.toHours();
            long minutes = duration.toMinutesPart();
            long seconds = duration.toSecondsPart();

            String message = String.format("Token is expired by %dh%dm%ds", hours, minutes, seconds);
            // TODO: Update Status for frontend requirement
            response.setStatus(403);
            response.setContentType("application/json");
            response.getWriter().write("{\"result\": \"false\" ,\"message\": \"" + message + "\" }");
            return;
        } catch (Exception ex) {
            // TODO: Update Status for frontend requirement
            response.setStatus(403);
            response.setContentType("application/json");
            response.getWriter().write("{\"result\": \"false\" ,\"message\": \"" + "Invalid Token!" + "\" }");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean isLoginRoute(HttpServletRequest request) {
        return "POST".equalsIgnoreCase(request.getMethod()) && "/login".equals(request.getServletPath());
    }
}
