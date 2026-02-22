package com.clinicapp.appointmentmodule.application.response;

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
public class AppointmentResponse {
    private UUID id;
    private UUID patientId;
    private UUID doctorId;
    private LocalDateTime appointmentDate;
    private String status;
    private String notes;
}
