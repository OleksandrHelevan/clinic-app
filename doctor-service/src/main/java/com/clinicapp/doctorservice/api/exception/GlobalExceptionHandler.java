package com.clinicapp.doctorservice.api.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(PatientServiceUnavailableException.class)
    public ResponseEntity<String> handleUnavailable(PatientServiceUnavailableException e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(e.getMessage());
    }

    @ExceptionHandler(PatientServiceTimeoutException.class)
    public ResponseEntity<String> handleTimeout(PatientServiceTimeoutException e) {
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                .body(e.getMessage());
    }
}
