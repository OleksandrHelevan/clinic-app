package com.clinicapp.appointmentmodule.exception;

import com.clinicapp.common.exception.EntityNotFoundException;

public class AppointmentNotFoundException extends EntityNotFoundException {
    public AppointmentNotFoundException(String message) {
        super(message);
    }
}
