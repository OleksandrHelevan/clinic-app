package com.clinicapp.patientmodule.exception;

import com.clinicapp.common.exception.EntityNotFoundException;

public class PatientNotFoundException extends EntityNotFoundException {
    public PatientNotFoundException(String message) {
        super(message);
    }
}
