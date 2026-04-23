package com.clinicapp.doctorservice.application.service.impl;

import com.clinicapp.doctorservice.application.dto.AddDoctorProfileRequest;
import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.mapper.DoctorMapper;
import com.clinicapp.doctorservice.application.service.DoctorService;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import com.clinicapp.doctorservice.infrastructure.persistence.DoctorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
@Service
@Slf4j
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final DoctorMapper doctorMapper;

    @Override
    public DoctorResponse getById(String id) {
        log.info("Fetching doctor by id: {}", id);
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return doctorMapper.toDto(doctor);
    }

    @Override
    public Page<DoctorResponse> getDoctorsBySpecialization(Specialization specialization, int page, int size) {
        log.info("Fetching doctors by specialization: {}", specialization);
        Pageable pageable = PageRequest.of(page, size);

        return doctorRepository
                .findBySpecialization(specialization, pageable)
                .map(doctorMapper::toDto);
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
                    .createdAt(OffsetDateTime.now())
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
    public boolean existsById(String id) {
        return doctorRepository.existsById(id);
    }

    @Override
    public DoctorResponse addDoctorProfile(String id, AddDoctorProfileRequest request) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor with id " + id + " not found"));
        doctorMapper.updateDoctorFromDto(request, doctor);
        doctor.setUpdatedAt(OffsetDateTime.now());
        return doctorMapper.toDto(doctorRepository.save(doctor));
    }

}