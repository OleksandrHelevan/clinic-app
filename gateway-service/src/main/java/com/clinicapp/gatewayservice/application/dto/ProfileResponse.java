package com.clinicapp.gatewayservice.application.dto;

public record ProfileResponse(
        String id,
        String email
) {
    public static ProfileResponse empty() {
        return new ProfileResponse("", "");
    }
}