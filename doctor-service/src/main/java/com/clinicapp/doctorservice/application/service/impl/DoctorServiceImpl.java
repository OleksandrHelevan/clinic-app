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
        Doctor doctor = doctorFactory.create(request);
        return doctorMapper.toDto(doctorRepository.save(doctor));
    }

    @Override
    public DoctorResponse getById(UUID id) {
        return doctorMapper.toDto(doctorRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Doctor not found")));
    }

    @Override//todo pagination
    public List<DoctorResponse> getDoctorsBySpecialization(Specialization specialization) {
        return doctorRepository.getDoctorBySpecialization(specialization)
                .stream()
                .map(doctorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public PatientResponse getPatientInfo(UUID id) {
        return patientClientFacade.getPatientWithRetry(id);
    }

}