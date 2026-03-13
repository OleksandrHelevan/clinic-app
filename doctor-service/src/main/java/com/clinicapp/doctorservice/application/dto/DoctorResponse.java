package com.clinicapp.doctorservice.application.dto;

import com.clinicapp.doctorservice.domain.doctor.Specialization;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorResponse {

    private UUID id;
    private String firstName;
    private String lastName;
    private Specialization specialization;
    private String email;
    private String phone;
}