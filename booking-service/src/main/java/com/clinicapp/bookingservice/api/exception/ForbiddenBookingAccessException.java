package com.clinicapp.bookingservice.api.exception;

public class ForbiddenBookingAccessException extends RuntimeException {

    public ForbiddenBookingAccessException() {
        super("You are not allowed to perform this action on the booking");
    }
}
