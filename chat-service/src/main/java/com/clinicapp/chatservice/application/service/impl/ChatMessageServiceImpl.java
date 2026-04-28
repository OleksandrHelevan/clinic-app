package com.clinicapp.chatservice.application.service.impl;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.dto.SendMessageRequest;
import com.clinicapp.chatservice.application.mapper.ChatMessageMapper;
import com.clinicapp.chatservice.application.service.ChatMessageService;
import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.event.ChatEvent;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import com.clinicapp.chatservice.infrastructure.persistence.ChatBucketRepository;
import com.clinicapp.chatservice.infrastructure.utils.ChatUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatBucketRepository chatBucketRepository;
    private final ChatMessageMapper chatMessageMapper;

    @Value("${chat.bucket.size:50}")
    private int bucketSize;

    @Override
    public ChatMessageDto saveMessage(SendMessageRequest request) {
        ChatMessage message = chatMessageMapper.toEntity(request);

        String chatId = ChatUtils.generateChatId(message.getSenderId(), message.getRecipientId());

        message.setTimestamp(LocalDateTime.now());
        message.setStatus(MessageStatus.RECEIVED);

        ChatBucket latestBucket = chatBucketRepository
                .findFirstByChatIdOrderByEndDateDesc(chatId)
                .orElse(null);

        if (latestBucket != null && latestBucket.getCount() < bucketSize) {
            latestBucket.getMessages().add(message);
            latestBucket.setCount(latestBucket.getCount() + 1);
            latestBucket.setEndDate(message.getTimestamp());

            chatBucketRepository.save(latestBucket);
        } else {
            ChatBucket newBucket = new ChatBucket();
            newBucket.setChatId(chatId);

            List<ChatMessage> messages = new ArrayList<>();
            messages.add(message);
            newBucket.setMessages(messages);

            newBucket.setCount(1);
            newBucket.setStartDate(message.getTimestamp());
            newBucket.setEndDate(message.getTimestamp());

            chatBucketRepository.save(newBucket);
        }

        return chatMessageMapper.toDto(message);
    }

    @Override
    public void processEvent(ChatEvent event) {
        switch (event.getType()) {
            case STATUS_UPDATE -> handleStatusUpdate(event);
            case LIKE_UPDATE -> handleLikeUpdate(event);
            case TYPING, STOPPED_TYPING -> log.trace("User {} is {}", event.getSenderId(), event.getType());
            default -> log.warn("Unknown event type: {}", event.getType());
        }
    }

    @Override
    public void markAllAsRead(String chatId, String senderId) {
        try {
            long updatedCount = chatBucketRepository.markMessagesAsRead(chatId, senderId);

            if (updatedCount > 0) {
                log.debug("Marked {} buckets as having READ messages for user {} in chat {}",
                        updatedCount, senderId, chatId);
            }
        } catch (Exception e) {
            log.error("Failed to mark messages as read for chat: {}", chatId, e);
        }
    }


    private void handleLikeUpdate(ChatEvent event) {
        if (event.getMessageId() == null || event.getIsLiked() == null) {
            log.error("Missing data for LIKE_UPDATE: msgId={}, isLiked={}",
                    event.getMessageId(), event.getIsLiked());
            return;
        }

        try {
            long updatedCount = chatBucketRepository.updateMessageLikeStatus(
                    event.getMessageId(),
                    event.getIsLiked()
            );

            if (updatedCount == 0) {
                log.warn("Message {} not found for LIKE_UPDATE", event.getMessageId());
            } else {
                log.debug("Message {} liked status updated to {}", event.getMessageId(), event.getIsLiked());
            }
        } catch (Exception e) {
            log.error("Failed to update message like status in MongoDB", e);
        }
    }

    private void handleStatusUpdate(ChatEvent event) {
        if (event.getMessageId() == null || event.getStatus() == null) {
            log.error("Missing data for STATUS_UPDATE: msgId={}, status={}",
                    event.getMessageId(), event.getStatus());
            return;
        }
        try {
            long updatedCount = chatBucketRepository.updateMessageStatus(
                    event.getMessageId(),
                    event.getStatus()
            );

            if (updatedCount == 0) {
                log.warn("Message {} not found or already has status {}", event.getMessageId(), event.getStatus());
            } else {
                log.debug("Updated message {} to status {}", event.getMessageId(), event.getStatus());
            }

        } catch (Exception e) {
            log.error("Failed to update message status in MongoDB", e);
        }
    }

}