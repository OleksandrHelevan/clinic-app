package com.clinicapp.chatservice.application.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatHistoryResponse {
    private String otherUserFirstName;
    private String otherUserLastName;
    private String otherUserId;
    private String otherUserAvatar;
    private String currentUserId;
    private List<ChatMessageDto> messages;
}
