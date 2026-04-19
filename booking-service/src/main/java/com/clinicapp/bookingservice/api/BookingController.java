package com.clinicapp.bookingservice.api;

import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.application.service.BookingService;
import com.clinicapp.bookingservice.domain.Booking;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public Booking create(@RequestBody CreateBookingRequest request) {
        return bookingService.create(request);
    }

    @GetMapping("/{id}")
    public Booking getById(@PathVariable String id) {
        return bookingService.getById(id);
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingService.getAll();
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Booking> getByDoctor(@PathVariable String doctorId) {
        return bookingService.getByDoctorId(doctorId);
    }

    @GetMapping("/patient/{patientId}")
    public List<Booking> getByPatient(@PathVariable String patientId) {
        return bookingService.getByPatientId(patientId);
    }
}