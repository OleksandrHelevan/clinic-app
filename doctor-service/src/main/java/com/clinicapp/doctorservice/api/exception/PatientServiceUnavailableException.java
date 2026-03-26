package com.clinicapp.doctorservice.api.exception;

public class PatientServiceUnavailableException extends RuntimeException {
  public PatientServiceUnavailableException(String message, Throwable cause) {
    super(message, cause);
  }
}