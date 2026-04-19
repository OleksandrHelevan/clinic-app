package com.clinicapp.patientservice.application.service.impl;

import com.clinicapp.patientservice.api.exception.PatientNotFoundException;
import com.clinicapp.patientservice.application.dto.CreatePatientRequest;
import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.patientservice.application.mapper.PatientMapper;
import com.clinicapp.patientservice.application.service.PatientService;
import com.clinicapp.patientservice.domain.patient.model.Patient;
import com.clinicapp.patientservice.infrastructure.persistence.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    @Transactional
    public PatientResponse createPatient(CreatePatientRequest request) {
        Patient patient = patientMapper.toEntity(request);
        return patientMapper.toDto(patientRepository.save(patient));
    }

    @Override
    public PatientResponse getPatientById(String id) {
        return patientMapper.toDto(patientRepository
                .findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found")));
    }

    @Override
    public void createInitialProfile(String id, String email) {
        Patient patient = Patient.builder().email(email).id(id).build();
        patientRepository.save(patient);
    }

    @Override
    public boolean existsById(String id){
        return patientRepository.existsById(id);
    }
}
