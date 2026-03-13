package com.clinicapp.doctorservice.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class PatientServiceUnavailableException extends RuntimeException {
  public PatientServiceUnavailableException(String message, Throwable cause) {
    super(message, cause);
  }
}