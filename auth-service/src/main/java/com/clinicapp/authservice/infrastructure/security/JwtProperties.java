package com.clinicapp.authservice.infrastructure.security;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Component;

@Component
@RefreshScope
@ConfigurationProperties(prefix = "security.jwt")
@Getter
@Setter
public class JwtProperties {

    private long expiration;
    private String secretKey;
}