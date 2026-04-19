package com.clinicapp.bookingservice.application.dto;

import com.clinicapp.bookingservice.domain.BookingStatus;
import lombok.Builder;

import java.time.OffsetDateTime;

@Builder
public record BookingResponse(

        String id,
        String doctorId,
        String patientId,
        OffsetDateTime bookedTime,
        String description,
        BookingStatus status,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt,
        boolean deleted

) {
}