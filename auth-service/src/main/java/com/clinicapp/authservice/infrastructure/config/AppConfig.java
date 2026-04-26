package com.clinicapp.authservice.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Component;

@Component
@RefreshScope
@ConfigurationProperties(prefix = "app")
@Getter
@Setter
public class AppConfig {

    private int httpTimeoutMs = 5000;

    private FeatureFlags featureFlags = new FeatureFlags();

    @Getter
    @Setter
    public static class FeatureFlags {
        private boolean notificationsEnabled = true;
    }
}