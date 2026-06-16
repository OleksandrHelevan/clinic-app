package com.clinicapp.bookingservice.application.mapper;

import com.clinicapp.bookingservice.application.dto.BookingResponse;
import com.clinicapp.bookingservice.domain.Booking;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public final class BookingMapper {

    private BookingMapper() {
    }

    public static BookingResponse toResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .doctorId(booking.getDoctorId())
                .patientId(booking.getPatientId())
                .bookedTime(toOffsetDateTime(booking.getBookedTime()))
                .description(booking.getDescription())
                .status(booking.getStatus())
                .createdAt(toOffsetDateTime(booking.getCreatedAt()))
                .updatedAt(toOffsetDateTime(booking.getUpdatedAt()))
                .build();
    }

    private static OffsetDateTime toOffsetDateTime(Instant instant) {
        return instant != null ? instant.atOffset(ZoneOffset.UTC) : null;
    }
}