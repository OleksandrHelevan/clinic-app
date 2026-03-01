package com.clinicapp.doctormodule.exception;

import com.clinicapp.common.exception.EntityNotFoundException;

public class DoctorNotFoundException extends EntityNotFoundException {
    public DoctorNotFoundException(String message) {
        super(message);
    }
}
