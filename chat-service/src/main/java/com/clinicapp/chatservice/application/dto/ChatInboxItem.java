package com.clinicapp.chatservice.application.dto;

import com.clinicapp.chatservice.domains.message.MessageStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatInboxItem {

    private String chatId;

    private String otherUserId;

    private String otherUserFirstName;

    private String otherUserLastName;

    private String otherUserAvatar;

    private String lastMessage;

    private LocalDateTime lastMessageTime;

    private MessageStatus lastMessageStatus;

    private boolean isLastMessageLiked;

    private long unreadCount;
}