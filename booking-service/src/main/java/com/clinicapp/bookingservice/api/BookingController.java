package com.clinicapp.bookingservice.api;

import com.clinicapp.bookingservice.application.dto.BookingResponse;
import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.application.service.BookingService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role,
            @Valid @RequestBody CreateBookingRequest request
    ) {
        return bookingService.create(request, userId, role);
    }

    @GetMapping("/me/upcoming")
    public List<BookingResponse> getMyUpcoming(
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role
    ) {
        return bookingService.getMyUpcoming(userId, role);
    }

    @GetMapping("/me")
    public List<BookingResponse> getMyHistory(
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role
    ) {
        return bookingService.getMyHistory(userId, role);
    }

    @GetMapping("/{id}")
    public BookingResponse getById(
            @PathVariable String id,
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role
    ) {
        return bookingService.getById(id, userId, role);
    }

    @PatchMapping("/{id}/cancel")
    public BookingResponse cancel(
            @PathVariable String id,
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role
    ) {
        return bookingService.cancel(id, userId, role);
    }

    @PatchMapping("/{id}/confirm")
    public BookingResponse confirm(
            @PathVariable String id,
            @Parameter(hidden = true) @RequestHeader("X-User-Id") String userId,
            @Parameter(hidden = true) @RequestHeader(value = "X-Role", defaultValue = "") String role
    ) {
        return bookingService.confirm(id, userId, role);
    }
}
