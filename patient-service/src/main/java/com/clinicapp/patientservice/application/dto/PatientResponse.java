package com.clinicapp.patientservice.application.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class PatientResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Instant dateOfBirth;
}
