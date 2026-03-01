package com.clinicapp.medicalrecordmodule.application.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    @NotNull
    private UUID patientId;

    @NotNull
    private UUID doctorId;

    @NotBlank
    @Size(max = 255)
    private String diagnosis;

    @Size(max = 2000)
    private String notes;

    @NotNull
    private LocalDateTime recordDate;
}
