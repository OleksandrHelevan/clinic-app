package com.clinicapp.chatservice.infrastructure.persistence;

public interface ChatBucketCustomRepository {
    long markMessagesAsRead(String chatId, String senderId);
    long updateMessageLikeStatus(String messageId, boolean isLiked);
}