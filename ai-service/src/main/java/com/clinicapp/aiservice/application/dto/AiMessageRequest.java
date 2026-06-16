package com.clinicapp.aiservice.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiMessageRequest {
    @NotBlank
    private String userId;
    @NotBlank
    private String message;
}