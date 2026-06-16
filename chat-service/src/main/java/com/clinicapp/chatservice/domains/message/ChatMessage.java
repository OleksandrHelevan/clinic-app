package com.clinicapp.chatservice.domains.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    @Builder.Default
    private String id = UUID.randomUUID().toString();

    private String senderId;
    private String recipientId;
    private String content;
    private LocalDateTime timestamp;
    private MessageStatus status;

    private String replyToMessageId;
    private String replyPreview;
    private String replySenderName;

    @Builder.Default
    private boolean isLiked = false;
}