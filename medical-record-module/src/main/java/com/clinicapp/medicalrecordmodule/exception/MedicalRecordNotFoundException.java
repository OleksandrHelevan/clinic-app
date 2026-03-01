package com.clinicapp.medicalrecordmodule.exception;

import com.clinicapp.common.exception.EntityNotFoundException;

public class MedicalRecordNotFoundException extends EntityNotFoundException {
    public MedicalRecordNotFoundException(String message) {
        super(message);
    }
}
