package com.clinicapp.doctorservice.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
public class PatientServiceTimeoutException extends RuntimeException {
  public PatientServiceTimeoutException(String message, Throwable cause) {
    super(message, cause);
  }
}