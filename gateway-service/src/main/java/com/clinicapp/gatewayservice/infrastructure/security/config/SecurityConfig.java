package com.clinicapp.gatewayservice.infrastructure.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/api/v1/login", "/api/v1/sign-up").permitAll()
                        .pathMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/webjars/**",
                                "/swagger-resources/**"
                        ).permitAll()
                        .pathMatchers(
                                "/auth-docs/**",
                                "/patient-docs/**",
                                "/doctor-docs/**",
                                "/booking-docs/**",
                                "/ai-docs/**"
                        ).permitAll()
                        .pathMatchers("/actuator/**").permitAll()
                        .anyExchange().permitAll()
                )
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .build();
    }
}