package com.clinicapp.common.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record DoctorResponse(
        String id,
        String firstName,
        String lastName,
        Specialization specialization,
        String avatarUrl,
        String email,
        String phone,
        Instant createdAt,
        Instant updatedAt
) {
}