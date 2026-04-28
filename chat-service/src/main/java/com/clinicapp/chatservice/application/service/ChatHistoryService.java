package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;

import java.util.List;

public interface ChatHistoryService {
    List<ChatMessageDto> getChatHistory(String senderId, String recipientId, int page);
    List<ChatMessageDto> getUserInbox(String userId);
}
