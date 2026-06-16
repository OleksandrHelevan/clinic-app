package com.clinicapp.chatservice.application.dto;

import com.clinicapp.chatservice.domains.message.MessageStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {
    private String id;
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