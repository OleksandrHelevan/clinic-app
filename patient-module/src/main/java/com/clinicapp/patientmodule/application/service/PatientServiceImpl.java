package com.clinicapp.patientmodule.application.service;

import com.clinicapp.patientmodule.application.mapper.PatientMapper;
import com.clinicapp.patientmodule.application.request.CreatePatientRequest;
import com.clinicapp.patientmodule.application.response.PatientResponse;
import com.clinicapp.patientmodule.domain.patient.Patient;
import com.clinicapp.patientmodule.domain.patient.PatientService;
import com.clinicapp.patientmodule.exception.PatientAlreadyExists;
import com.clinicapp.patientmodule.exception.PatientNotFoundException;
import com.clinicapp.patientmodule.infrastructure.persistence.PatientRepository;
import com.clinicapp.patientmodule.infrastructure.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository, PatientMapper patientMapper) {
        this.patientRepository = patientRepository;
        this.patientMapper = patientMapper;
    }

    @Override
    @Transactional("patientTransactionManager")
    public PatientResponse createPatient(CreatePatientRequest patient) {
        if (patientRepository.existsPatientsByEmail(patient.getEmail()))
            throw new PatientAlreadyExists(ErrorMessage.PATIENT_ALREADY_EXISTS);
        Patient patientEntity = patientMapper.toEntity(patient);
        return patientMapper.toDto(patientRepository.save(patientEntity));
    }

    @Override
    public PatientResponse getPatientById(UUID id) {
        return patientMapper
                .toDto(patientRepository
                        .findById(id)
                        .orElseThrow(() -> new PatientNotFoundException(
                                ErrorMessage.PATIENT_NOT_FOUND)));
    }
}
