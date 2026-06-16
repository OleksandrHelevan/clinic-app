package com.clinicapp.aiservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GeminiResponse {
    private String message;
    private String specialization;
}