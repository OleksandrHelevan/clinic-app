package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.application.dto.ChatHistoryResponse;
import com.clinicapp.chatservice.application.dto.ChatInboxItem;

import java.util.List;

public interface ChatHistoryService {
    ChatHistoryResponse getChatHistory(String senderId, String recipientId, int page);
    List<ChatInboxItem> getUserInbox(String userId);
}