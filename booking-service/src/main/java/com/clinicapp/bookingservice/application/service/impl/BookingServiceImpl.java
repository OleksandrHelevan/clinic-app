package com.clinicapp.bookingservice.application.service.impl;

import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.application.service.BookingService;
import com.clinicapp.bookingservice.domain.Booking;
import com.clinicapp.bookingservice.domain.BookingStatus;
import com.clinicapp.bookingservice.infrastructure.persistence.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking create(CreateBookingRequest request) {
        Booking booking = Booking.builder()
                .doctorId(request.doctorId())
                .patientId(request.patientId())
                .bookedTime(request.bookedTime())
                .description(request.description())
                .status(BookingStatus.PENDING)
                .deleted(false)
                .build();

        return bookingRepository.save(booking);
    }

    @Override
    public Booking getById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getByDoctorId(String doctorId) {
        return bookingRepository.findAllByDoctorId(doctorId);
    }

    @Override
    public List<Booking> getByPatientId(String patientId) {
        return bookingRepository.findAllByPatientId(patientId);
    }
}