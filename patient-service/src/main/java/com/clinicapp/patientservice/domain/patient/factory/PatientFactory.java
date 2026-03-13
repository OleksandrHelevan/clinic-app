package com.clinicapp.patientservice.domain.patient.factory;

import com.clinicapp.patientservice.domain.patient.model.Patient;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

@Component
public class PatientFactory {

    public Patient create(String firstName,
                          String lastName,
                          LocalDate dateOfBirth,
                          String email,
                          String phoneNumber) {
        return new Patient(
                UUID.randomUUID(),
                firstName,
                lastName,
                dateOfBirth,
                email,
                phoneNumber
        );
    }
}