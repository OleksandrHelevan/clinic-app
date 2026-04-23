package com.clinicapp.chatservice.application.dto;

import com.clinicapp.chatservice.domains.event.ChatEventType;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatEvent {
    private ChatEventType type;
    private String senderId;
    private String recipientId;

    private String messageId;
    private MessageStatus status;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}