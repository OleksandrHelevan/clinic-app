package com.clinicapp.bookingservice.api.exception;

public class InvalidBookingTimeException extends RuntimeException {

    public InvalidBookingTimeException() {
        super("Booking time must be in the future");
    }
}
