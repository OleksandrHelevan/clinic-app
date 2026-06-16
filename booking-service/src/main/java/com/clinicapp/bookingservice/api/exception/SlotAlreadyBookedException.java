package com.clinicapp.bookingservice.api.exception;

public class SlotAlreadyBookedException extends RuntimeException {

    public SlotAlreadyBookedException(String doctorId) {
        super("Doctor already has a booking at the requested time: " + doctorId);
    }
}
