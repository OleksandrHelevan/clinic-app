package com.clinicapp.securitylib.config;

import com.clinicapp.securitylib.filter.JwtFilter;
import com.clinicapp.securitylib.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityAutoConfiguration {

    @Bean
    public JwtUtil jwtUtil(@Value("${security.jwt.secret-key}") String secret) {
        return new JwtUtil(secret);
    }

    @Bean
    public JwtFilter jwtFilter(JwtUtil jwtUtil) {
        return new JwtFilter(jwtUtil);
    }
}