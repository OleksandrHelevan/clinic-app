package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.domains.event.ChatEvent;
import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatEventService {

    private final MongoTemplate mongoTemplate;

    public void processEvent(ChatEvent event) {
        switch (event.getType()) {
            case STATUS_UPDATE -> handleStatusUpdate(event);
            case TYPING, STOPPED_TYPING -> log.trace("User {} is {}", event.getSenderId(), event.getType());
            default -> log.warn("Unknown event type: {}", event.getType());
        }
    }

    private void handleStatusUpdate(ChatEvent event) {
        if (event.getMessageId() == null || event.getStatus() == null) {
            log.error("Missing data for STATUS_UPDATE: msgId={}, status={}",
                    event.getMessageId(), event.getStatus());
            return;
        }

        Query query = new Query(Criteria.where("messages.id").is(event.getMessageId()));

        Update update = new Update().set("messages.$.status", event.getStatus());

        try {
            var result = mongoTemplate.updateFirst(query, update, ChatBucket.class);

            if (result.getMatchedCount() == 0) {
                log.warn("Message {} not found in any bucket", event.getMessageId());
            } else {
                log.debug("Updated message {} to status {}", event.getMessageId(), event.getStatus());
            }
        } catch (Exception e) {
            log.error("Failed to update message status in MongoDB", e);
        }
    }

    public void markAllAsRead(String chatId, String senderId) {
        Query query = new Query(Criteria.where("chatId").is(chatId)
                .and("messages.senderId").is(senderId)
                .and("messages.status").ne(MessageStatus.READ));

        Update update = new Update().set("messages.$[msg].status", MessageStatus.READ)
                .filterArray(Criteria.where("msg.senderId").is(senderId)
                        .and("msg.status").ne(MessageStatus.READ));

        mongoTemplate.updateMulti(query, update, ChatBucket.class);
    }
}