package com.clinicapp.bookingservice.application.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;

public record CreateBookingRequest(

        @NotNull
        String doctorId,

        @NotNull
        OffsetDateTime bookedTime,

        @Size(max = 500)
        String description
) {
}
