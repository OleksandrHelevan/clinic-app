package com.clinicapp.authservice.api;

import com.clinicapp.authservice.infrastructure.security.JwtProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/config")
public class ConfigController {

    private final JwtProperties jwtProperties;

    public ConfigController(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @GetMapping
    public Map<String, Object> getJwt() {
        return Map.of(
                "expiration", jwtProperties.getExpiration(),
                "secretKey", jwtProperties.getSecretKey()
        );
    }
}