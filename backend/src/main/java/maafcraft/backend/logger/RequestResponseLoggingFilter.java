package maafcraft.backend.logger;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestResponseLoggingFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(RequestResponseLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {


        // Log the request
        logger.info("Request URL: {} | Request Method: {}", request.getRequestURL(),request.getMethod());

//         String body = new String(IOUtils.toByteArray(request.getInputStream()));
//         logger.info("Request body: {}", body);


        try {
            // Proceed with the filter chain
            filterChain.doFilter(request, response);

            // Log the response
            // String responseBody = new String(IOUtils.toByteArray(response));
            logger.info("Response Status: {}", response.getStatus());
            // logger.info("Response Headers: {}", response.getHeaderNames());

            // Log the response body if necessary
            // For example, if you need to log JSON payload:
            // logger.info("Response Body: {}", getResponseBody(response));

        } catch (Exception e) {
            // Log any errors that occur during processing
            logger.error("Error processing request: {}", e.getMessage());
            // Optionally, log stack trace
            logger.error("Stack trace: ", e);
            throw e;
        }
    }

}
