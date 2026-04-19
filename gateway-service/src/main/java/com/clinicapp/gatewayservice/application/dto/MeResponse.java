package com.clinicapp.gatewayservice.application.dto;

import java.util.List;

public record MeResponse(
        String userId,
        String role,
        ProfileResponse profile,
        List<BookingResponse> bookings
) {}