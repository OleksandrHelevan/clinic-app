package com.clinicapp.doctormodule.exception;

import com.clinicapp.common.exception.EntityAlreadyExistsException;

public class DoctorAlreadyExistsException extends EntityAlreadyExistsException {
    public DoctorAlreadyExistsException(String message) {
        super(message);
    }
}
