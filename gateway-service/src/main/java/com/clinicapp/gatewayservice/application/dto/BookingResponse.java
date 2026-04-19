package com.clinicapp.gatewayservice.application.dto;

import java.time.LocalDateTime;

public record BookingResponse(
        String id,
        LocalDateTime time,
        String status
) {}