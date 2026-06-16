package com.clinicapp.bookingservice.api.exception;

public class ExternalServiceUnavailableException extends RuntimeException {

    public ExternalServiceUnavailableException(String serviceName) {
        super(serviceName + " is temporarily unavailable");
    }
}
