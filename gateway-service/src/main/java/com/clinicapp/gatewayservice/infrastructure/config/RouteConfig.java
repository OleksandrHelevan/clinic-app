package com.clinicapp.gatewayservice.infrastructure.config;

import com.clinicapp.gatewayservice.infrastructure.security.AuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import reactor.core.publisher.Mono;

@Configuration
@RequiredArgsConstructor
public class RouteConfig {

    private final AuthenticationFilter authFilter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route("auth-service-public", r -> r.path("/api/v1/login", "/api/v1/sign-up")
                        .filters(f -> f.requestRateLimiter(c -> c.setRateLimiter(loginRateLimiter())))
                        .uri("lb://auth-service"))

                .route("auth-service-protected", r -> r.path("/api/v1/users/**", "/api/v1/internal/me-context")
                        .filters(f -> f.filter(authFilter.apply(new AuthenticationFilter.Config()))
                                .requestRateLimiter(c -> c.setRateLimiter(standardRateLimiter()).setKeyResolver(userKeyResolver())))
                        .uri("lb://auth-service"))

                .route("patient-service", r -> r.path("/api/v1/patients/**")
                        .filters(f -> f.filter(authFilter.apply(new AuthenticationFilter.Config()))
                                .requestRateLimiter(c -> c.setRateLimiter(standardRateLimiter()).setKeyResolver(userKeyResolver())))
                        .uri("lb://patient-service"))

                .route("doctor-service", r -> r.path("/api/v1/doctors/**")
                        .filters(f -> f.filter(authFilter.apply(new AuthenticationFilter.Config()))
                                .requestRateLimiter(c -> c.setRateLimiter(standardRateLimiter()).setKeyResolver(userKeyResolver())))
                        .uri("lb://doctor-service"))

                .route("booking-service", r -> r.path("/api/v1/bookings/**")
                        .filters(f -> f.filter(authFilter.apply(new AuthenticationFilter.Config()))
                                .requestRateLimiter(c -> c.setRateLimiter(standardRateLimiter()).setKeyResolver(userKeyResolver())))
                        .uri("lb://booking-service"))

                .route("auth-service-docs", r -> r.path("/auth-docs/**")
                        .filters(f -> f.rewritePath("/auth-docs/(?<segment>.*)", "/${segment}"))
                        .uri("lb://auth-service"))

                .route("patient-service-docs", r -> r.path("/patient-docs/**")
                        .filters(f -> f.rewritePath("/patient-docs/(?<segment>.*)", "/${segment}"))
                        .uri("lb://patient-service"))

                .route("doctor-service-docs", r -> r.path("/doctor-docs/**")
                        .filters(f -> f.rewritePath("/doctor-docs/(?<segment>.*)", "/${segment}"))
                        .uri("lb://doctor-service"))

                .route("booking-service-docs", r -> r.path("/booking-docs/**")
                        .filters(f -> f.rewritePath("/booking-docs/(?<segment>.*)", "/${segment}"))
                        .uri("lb://booking-service"))

                .build();
    }

    @Bean
    @Primary
    public RedisRateLimiter standardRateLimiter() {
        return new RedisRateLimiter(10, 20);
    }

    @Bean
    public RedisRateLimiter loginRateLimiter() {
        return new RedisRateLimiter(2, 5);
    }

    @Bean
    @Primary
    public KeyResolver userKeyResolver() {
        return exchange -> Mono.justOrEmpty(exchange.getRequest().getHeaders().getFirst("X-User-Id"))
                .defaultIfEmpty("anonymous");
    }
}