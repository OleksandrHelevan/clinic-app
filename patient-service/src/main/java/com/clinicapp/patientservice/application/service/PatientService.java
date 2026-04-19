package com.clinicapp.patientservice.application.service;

import com.clinicapp.patientservice.application.dto.CreatePatientRequest;
import com.clinicapp.common.dto.PatientResponse;

import java.util.UUID;

public interface PatientService {

    PatientResponse createPatient(CreatePatientRequest request);
    PatientResponse getPatientById(String id);
    void createInitialProfile(String id, String email);
    boolean existsById(String id);
}
