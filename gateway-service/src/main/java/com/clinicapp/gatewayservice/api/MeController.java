package com.clinicapp.gatewayservice.api;

import com.clinicapp.gatewayservice.application.dto.MeResponse;
import com.clinicapp.gatewayservice.application.service.MeService;
import com.clinicapp.securitylib.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class MeController {

    private final MeService meService;
    private final JwtUtil jwtUtil;

    @GetMapping("/me")
    public Mono<MeResponse> me(ServerWebExchange exchange) {
        String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        }

        try {
            Claims claims = jwtUtil.validate(authHeader.substring(7));
            String userId = claims.getSubject();
            String role = claims.get("role", String.class);
            return meService.getMe(userId, role);
        } catch (Exception e) {
            return Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        }
    }
}