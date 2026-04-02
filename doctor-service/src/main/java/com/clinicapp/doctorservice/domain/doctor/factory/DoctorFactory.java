package com.clinicapp.doctorservice.domain.doctor.factory;

import com.clinicapp.doctorservice.application.dto.CreateDoctorRequest;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DoctorFactory {

    public Doctor create(CreateDoctorRequest request) {
        return Doctor.builder()
                .id(UUID.randomUUID().toString())
                .firstName(normalize(request.getFirstName()))
                .lastName(normalize(request.getLastName()))
                .specialization(request.getSpecialization())
                .email(normalizeEmail(request.getEmail()))
                .phone(normalizePhone(request.getPhone()))
                .build();
    }

    private String normalize(String value) {
        return value != null ? value.trim() : null;
    }

    private String normalizeEmail(String email) {
        return email != null ? email.trim().toLowerCase() : null;
    }

    private String normalizePhone(String phone) {
        return phone != null ? phone.trim() : null;
    }
}