package com.clinicapp.bookingservice.api.exception;

public class DoctorNotFoundException extends RuntimeException {

    public DoctorNotFoundException(String doctorId) {
        super("Doctor not found: " + doctorId);
    }
}
