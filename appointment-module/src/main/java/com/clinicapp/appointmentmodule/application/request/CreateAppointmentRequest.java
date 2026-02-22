package com.clinicapp.appointmentmodule.application.request;

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
public class CreateAppointmentRequest {
    private UUID patientId;
    private UUID doctorId;
    private LocalDateTime appointmentDate;
    private String status;
    private String notes;
}
