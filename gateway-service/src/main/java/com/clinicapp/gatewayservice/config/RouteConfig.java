package com.clinicapp.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route("auth-service", predicate ->
                        predicate.path("/api/v1/login", "/api/v1/sign-up", "/api/v1/users/**")
                                .uri("lb://auth-service")
                )
                .route("patient-service", predicate ->
                        predicate.path("/api/v1/patients/**")
                                .uri("lb://patient-service")
                )
                .route("doctor-service", predicate ->
                        predicate.path("/api/v1/doctors/**")
                                .uri("lb://doctors-service")
                )
                .route("booking-service", predicate ->
                        predicate.path("/api/v1/bookings/**")
                                .uri("lb://booking-service")
                )
                .route("auth-service-docs", predicate ->
                        predicate.path("/auth-docs/**")
                                .filters(f -> f.rewritePath("/auth-docs/(?<segment>.*)", "/${segment}"))
                                .uri("lb://auth-service")
                )
                .route("patient-service-docs", predicate ->
                        predicate.path("/patient-docs/**")
                                .filters(f -> f.rewritePath("/patient-docs/(?<segment>.*)", "/${segment}"))
                                .uri("lb://patient-service")
                )
                .route("doctor-service-docs", predicate ->
                        predicate.path("/doctor-docs/**")
                                .filters(f -> f.rewritePath("/doctor-docs/(?<segment>.*)", "/${segment}"))
                                .uri("lb://doctor-service")
                )
                .route("booking-service-docs", predicate ->
                        predicate.path("/booking-docs/**")
                                .filters(f -> f.rewritePath("/booking-docs/(?<segment>.*)", "/${segment}"))
                                .uri("lb://booking-service")
                )
                .build();
    }
}