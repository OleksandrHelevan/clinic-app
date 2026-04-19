package com.clinicapp.bookingservice.application.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;
import java.util.UUID;

public record CreateBookingRequest(

        @NotNull
        String doctorId,

        @NotNull
        String patientId,

        @NotNull
        OffsetDateTime bookedTime,

        @Size(max = 500)
        String description
) {
}