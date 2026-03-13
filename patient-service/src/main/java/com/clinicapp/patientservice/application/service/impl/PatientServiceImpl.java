package com.clinicapp.patientservice.application.service.impl;

import com.clinicapp.patientservice.application.dto.CreatePatientRequest;
import com.clinicapp.patientservice.application.dto.PatientResponse;
import com.clinicapp.patientservice.application.mapper.PatientMapper;
import com.clinicapp.patientservice.application.service.PatientService;
import com.clinicapp.patientservice.domain.patient.factory.PatientFactory;
import com.clinicapp.patientservice.domain.patient.model.Patient;
import com.clinicapp.patientservice.infrastructure.persistence.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;
    private final PatientFactory patientFactory;

    @Override
    public PatientResponse createPatient(CreatePatientRequest request) {
        Patient patient = patientFactory
                .create(request.getFirstName(),
                        request.getLastName(),
                        request.getDateOfBirth(),
                        request.getEmail(),
                        request.getPhoneNumber());
        return patientMapper.toDto(patientRepository.save(patient));
    }

    @Override
    public PatientResponse getPatientById(UUID id) {
        return patientMapper.toDto(patientRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found")));
    }
}
