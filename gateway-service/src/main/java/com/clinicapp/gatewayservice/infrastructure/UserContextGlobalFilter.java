package com.clinicapp.gatewayservice.infrastructure;

import org.jspecify.annotations.NullMarked;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class UserContextGlobalFilter implements GlobalFilter, Ordered {

    private static final String USER_ID_HEADER = "X-User-Id";
    private static final String ROLE_HEADER = "X-Role";
    private static final String GATEWAY_HEADER = "X-Gateway-Token";

    @Override
    @NullMarked
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        String userId = request.getHeaders().getFirst(USER_ID_HEADER);
        String role = request.getHeaders().getFirst(ROLE_HEADER);

        ServerHttpRequest mutatedRequest = request.mutate()
                .header(USER_ID_HEADER, userId != null ? userId : "")
                .header(ROLE_HEADER, role != null ? role : "")
                .header(GATEWAY_HEADER, "gateway-service-token")
                .build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    @Override
    public int getOrder() {
        return -1;
    }
}