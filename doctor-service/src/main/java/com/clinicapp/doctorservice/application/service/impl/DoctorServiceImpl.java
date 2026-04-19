package com.clinicapp.doctorservice.application.service.impl;

import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.doctorservice.application.dto.CreateDoctorRequest;
import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.mapper.DoctorMapper;
import com.clinicapp.doctorservice.application.service.DoctorService;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import com.clinicapp.doctorservice.domain.doctor.factory.DoctorFactory;
import com.clinicapp.doctorservice.infrastructure.client.facade.PatientClientFacade;
import com.clinicapp.doctorservice.infrastructure.persistence.DoctorRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorFactory doctorFactory;
    private final DoctorMapper doctorMapper;
    private final PatientClientFacade patientClientFacade;

    @Override
    public DoctorResponse createDoctor(CreateDoctorRequest request) {
        log.info("Creating doctor: {} {}", request.getFirstName(), request.getLastName());

        Doctor doctor = doctorFactory.create(request);
        try {
            Doctor saved = doctorRepository.save(doctor);
            return doctorMapper.toDto(saved);
        } catch (DuplicateKeyException e) {
            log.warn("Duplicate email detected: {}", request.getEmail());
            throw new RuntimeException("Doctor with this email already exists");
        }
    }

    @Override
    public DoctorResponse getById(String id) {
        log.info("Fetching doctor by id: {}", id);
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return doctorMapper.toDto(doctor);
    }

    @Override
    public List<DoctorResponse> getDoctorsBySpecialization(Specialization specialization, int page, int size) {
        log.info("Fetching doctors by specialization: {}", specialization);
        Pageable pageable = PageRequest.of(page, size);
        Page<Doctor> doctorsPage = doctorRepository.findBySpecialization(specialization, pageable);

        return doctorsPage.stream()
                .map(doctorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @CircuitBreaker(name = "patientService", fallbackMethod = "getPatientFallback")
    public PatientResponse getPatientInfo(UUID id) {
        log.info("Fetching patient info for id: {}", id);
        return patientClientFacade.getPatientWithRetry(id);
    }

    @Override
    public void createInitialProfile(String id, String email) {
        log.info("Creating initial doctor profile for userId: {}", id);
        if (doctorRepository.existsById(id)) {
            log.info("Doctor profile already exists for userId: {}, skipping", id);
            return;
        }
        try {
            Doctor doctor = Doctor.builder()
                    .id(id)
                    .email(email)
                    .build();
            doctorRepository.save(doctor);
            log.info("Doctor profile created successfully for userId: {}", id);
        } catch (DuplicateKeyException e) {
            log.warn("Duplicate detected for userId: {}, treating as success", id);
        } catch (Exception e) {
            log.error("Failed to create doctor profile for userId {}: {}", id, e.getMessage());
            throw new RuntimeException("Doctor profile creation failed", e);
        }
    }

    @Override
    public boolean existsById(String id){
        return doctorRepository.existsById(id);
    }

    public PatientResponse getPatientFallback(String id, Throwable t) {
        log.warn("Patient service unavailable for id {}: {}", id, t.getMessage());
        return null;
    }

}