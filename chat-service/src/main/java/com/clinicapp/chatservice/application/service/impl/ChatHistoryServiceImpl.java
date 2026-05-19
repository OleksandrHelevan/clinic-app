package com.clinicapp.chatservice.application.service.impl;

import com.clinicapp.chatservice.application.dto.ChatHistoryResponse; // Імпортуємо відповідь
import com.clinicapp.chatservice.application.dto.ChatInboxItem;
import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.mapper.ChatMessageMapper;
import com.clinicapp.chatservice.application.service.ChatHistoryService;
import com.clinicapp.chatservice.application.service.UserService;
import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import com.clinicapp.chatservice.infrastructure.persistence.ChatBucketRepository;
import com.clinicapp.chatservice.infrastructure.utils.ChatUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatHistoryServiceImpl implements ChatHistoryService {

    private final ChatBucketRepository chatBucketRepository;
    private final ChatMessageMapper chatMessageMapper;
    private final UserService userService;

    @Value("${chat.pagination.buckets-per-page:1}")
    private int bucketsPerPage;

    @Override
    public ChatHistoryResponse getChatHistory(String senderId, String otherUserId, int page) {
        String chatId = ChatUtils.generateChatId(senderId, otherUserId);
        PageRequest pageRequest = PageRequest.of(
                page,
                bucketsPerPage,
                Sort.by(Sort.Direction.DESC, "endDate")
        );

        List<ChatBucket> buckets = chatBucketRepository.findByChatId(chatId, pageRequest);
        List<ChatMessageDto> messages = buckets.stream()
                .flatMap(bucket -> bucket.getMessages().stream())
                .sorted(Comparator.comparing(ChatMessage::getTimestamp))
                .map(chatMessageMapper::toDto)
                .collect(Collectors.toList());

        String fullName = userService.getUserFullName(otherUserId);

        String firstName = fullName;
        String lastName = "";
        if (fullName.contains(" ")) {
            String[] parts = fullName.split(" ", 2);
            firstName = parts[0];
            lastName = parts[1];
        }

        return ChatHistoryResponse.builder()
                .currentUserId(senderId)
                .otherUserId(otherUserId)
                .otherUserFirstName(firstName)
                .otherUserLastName(lastName)
                .otherUserAvatar(null)
                .messages(messages)
                .build();
    }

    @Override
    public List<ChatInboxItem> getUserInbox(String userId) {
        List<ChatBucket> lastBuckets = chatBucketRepository.findLastBucketsForUser(userId);

        return lastBuckets.stream()
                .map(bucket -> {
                    ChatMessage lastMessage = bucket.getMessages().stream()
                            .max(Comparator.comparing(ChatMessage::getTimestamp))
                            .orElse(null);

                    if (lastMessage == null) return null;

                    String otherUserId = lastMessage.getSenderId().equals(userId)
                            ? lastMessage.getRecipientId()
                            : lastMessage.getSenderId();

                    String fullName = userService.getUserFullName(otherUserId);

                    String firstName = fullName;
                    String lastName = "";
                    if (fullName.contains(" ")) {
                        String[] parts = fullName.split(" ", 2);
                        firstName = parts[0];
                        lastName = parts[1];
                    }

                    return ChatInboxItem.builder()
                            .chatId(bucket.getChatId())
                            .otherUserId(otherUserId)
                            .otherUserFirstName(firstName)
                            .otherUserLastName(lastName)
                            .lastMessage(lastMessage.getContent())
                            .lastMessageTime(lastMessage.getTimestamp())
                            .lastMessageStatus(lastMessage.getStatus())
                            .isLastMessageLiked(lastMessage.isLiked())
                            .unreadCount(0)
                            .build();
                })
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(ChatInboxItem::getLastMessageTime).reversed())
                .collect(Collectors.toList());
    }
}