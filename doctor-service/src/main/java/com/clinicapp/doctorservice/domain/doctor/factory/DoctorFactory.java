package com.clinicapp.doctorservice.domain.doctor.factory;

import com.clinicapp.doctorservice.application.dto.CreateDoctorRequest;
import com.clinicapp.doctorservice.domain.doctor.Doctor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DoctorFactory {

    public Doctor create(CreateDoctorRequest request) {
        return Doctor.builder()
                .id(UUID.randomUUID())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .specialization(request.getSpecialization())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();
    }
}