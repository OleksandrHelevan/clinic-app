package com.clinicapp.aiservice.application.dto;

import com.clinicapp.common.dto.DoctorResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiMessageResponse {
    private String userId;
    private String message;
    private String role;
    private LocalDateTime timestamp;
    private DoctorResponse recommendedDoctor;
}