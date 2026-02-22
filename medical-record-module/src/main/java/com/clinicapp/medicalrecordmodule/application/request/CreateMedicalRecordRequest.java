package com.clinicapp.medicalrecordmodule.application.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMedicalRecordRequest {
    private UUID patientId;
    private UUID doctorId;
    private String diagnosis;
    private String notes;
    private LocalDateTime recordDate;
}
