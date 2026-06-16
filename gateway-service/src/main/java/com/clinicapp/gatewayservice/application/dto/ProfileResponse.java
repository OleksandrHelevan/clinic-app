package com.clinicapp.gatewayservice.application.dto;

import java.time.Instant;

public record ProfileResponse(
        String id,
        String firstName,
        String lastName,
        String specialization,
        String avatarUrl,
        String email,
        String phone,
        Instant createdAt,
        Instant updatedAt
) {
    public static ProfileResponse empty() {
        return new ProfileResponse(
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                null,
                null
        );
    }
}