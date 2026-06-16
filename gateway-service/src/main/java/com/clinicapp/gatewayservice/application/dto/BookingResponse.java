package com.clinicapp.gatewayservice.application.dto;

import java.time.OffsetDateTime;

public record BookingResponse(
        String id,
        String doctorId,
        String patientId,
        OffsetDateTime bookedTime,
        String description,
        String status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}
