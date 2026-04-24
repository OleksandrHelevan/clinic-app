package com.clinicapp.doctorservice.application.dto;

import com.clinicapp.doctorservice.domain.doctor.Specialization;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.time.OffsetDateTime;

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