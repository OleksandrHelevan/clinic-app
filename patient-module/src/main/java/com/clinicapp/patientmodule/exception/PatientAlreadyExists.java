package com.clinicapp.patientmodule.exception;

import com.clinicapp.common.exception.EntityAlreadyExistsException;

public class PatientAlreadyExists extends EntityAlreadyExistsException {
    public PatientAlreadyExists(String message) {
        super(message);
    }
}
