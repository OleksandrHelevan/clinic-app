package com.clinicapp.bookingservice.infrastructure.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "clinic.services")
public record ServiceProperties(
        String doctorServiceUrl,
        String patientServiceUrl
) {
}
