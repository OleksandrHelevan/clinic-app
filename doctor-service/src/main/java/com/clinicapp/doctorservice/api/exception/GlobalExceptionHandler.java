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
    public ResponseEntity<String> handlePatientUnavailable(PatientServiceUnavailableException e) {
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT)
                .body(e.getMessage());
    }
}
