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
                .route("patient-service", predicate ->
                        predicate.path("/patients/**")
                                .uri("lb://patient-service")
                )
                .route("doctor-service", predicate ->
                        predicate.path("/doctors/**")
                                .uri("lb://doctors-service")
                )
                .route("auth-service", predicate ->
                        predicate.path("/login", "/sign-up")
                                .uri("lb://auth-service")
                )
                .build();
    }
}