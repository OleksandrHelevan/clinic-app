package com.clinicapp.chatservice.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {

    @NotBlank(message = "Sender ID is required")
    private String senderId;

    @NotBlank(message = "Recipient ID is required")
    private String recipientId;

    @NotBlank(message = "Content cannot be empty")
    private String content;
}