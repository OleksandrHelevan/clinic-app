package com.clinicapp.bookingservice.application.service;

import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.domain.Booking;

import java.util.List;
import java.util.UUID;

public interface BookingService {

    Booking create(CreateBookingRequest request);

    Booking getById(String id);

    List<Booking> getAll();

    List<Booking> getByDoctorId(String doctorId);

    List<Booking> getByPatientId(String patientId);
}