package com.clinicapp.gatewayservice.infrastructure.security;

import com.clinicapp.securitylib.annotation.EnableCustomFilter;
import com.clinicapp.securitylib.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NullMarked;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@EnableCustomFilter
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private final JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    public static class Config {}

    @Override
    @NullMarked
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String path = request.getURI().getPath();

            log.info("Gateway: Security check for request [{}] {}", request.getMethod(), path);

            String authHeader = request.getHeaders().getFirst("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                log.warn("Gateway: Request rejected. Missing or invalid Authorization header for path: {}", path);
                return onError(exchange);
            }

            String token = authHeader.substring(7);
            try {
                Claims claims = jwtUtil.validate(token);
                String userId = claims.getSubject();
                String role = claims.get("role", String.class);

                log.info("Gateway: Authorization successful. User: ID={}, Role={}", userId, role);

                ServerHttpRequest mutatedRequest = request.mutate()
                        .header("X-User-Id", userId)
                        .header("X-Role", role)
                        .build();

                return chain.filter(exchange.mutate().request(mutatedRequest).build());

            } catch (Exception e) {
                log.error("Gateway: Token validation failed for path {}. Reason: {}", path, e.getMessage());
                return onError(exchange);
            }
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}