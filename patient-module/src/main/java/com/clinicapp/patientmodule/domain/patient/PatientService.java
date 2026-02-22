package com.clinicapp.patientmodule.domain.patient;

import com.clinicapp.patientmodule.application.request.CreatePatientRequest;
import com.clinicapp.patientmodule.application.response.PatientResponse;

import java.util.UUID;

public interface PatientService {
    PatientResponse createPatient(CreatePatientRequest patient);
    PatientResponse getPatientById(UUID id);
}
