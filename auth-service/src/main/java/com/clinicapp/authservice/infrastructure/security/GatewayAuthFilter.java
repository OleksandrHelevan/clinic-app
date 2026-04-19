package com.clinicapp.authservice.infrastructure.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class GatewayAuthFilter extends OncePerRequestFilter {

    private static final String TOKEN = "gateway-service-token";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        if (request.getRequestURI().startsWith("/internal")) {

            String header = request.getHeader("X-Gateway-Token");

            if (!TOKEN.equals(header)) {
                response.setStatus(403);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}