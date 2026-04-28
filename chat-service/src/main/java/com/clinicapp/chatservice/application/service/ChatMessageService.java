package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.dto.SendMessageRequest;
import com.clinicapp.chatservice.domains.event.ChatEvent;

public interface ChatMessageService {
    ChatMessageDto saveMessage(SendMessageRequest request);
    void processEvent(ChatEvent event);
    void markAllAsRead(String chatId, String senderId);
}