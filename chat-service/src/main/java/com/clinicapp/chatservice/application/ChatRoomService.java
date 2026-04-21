package com.clinicapp.chatservice.application;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final MongoTemplate mongoTemplate;

    public Optional<String> getChatId(String senderId, String recipientId, boolean createIfNotExist) {
        String chatId = String.format("%s_%s", senderId, recipientId);

        return Optional.of(chatId);
    }
}