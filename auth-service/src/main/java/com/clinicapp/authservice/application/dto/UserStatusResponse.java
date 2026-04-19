package com.clinicapp.authservice.application.dto;

import com.clinicapp.authservice.domain.RegistrationStatus;

public record UserStatusResponse(
        String userId,
        RegistrationStatus status,
        String failureReason
) {}