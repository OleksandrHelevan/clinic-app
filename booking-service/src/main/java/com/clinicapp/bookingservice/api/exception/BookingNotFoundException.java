package com.clinicapp.bookingservice.api.exception;

public class BookingNotFoundException extends RuntimeException {

    public BookingNotFoundException(String id) {
        super("Booking not found: " + id);
    }
}
