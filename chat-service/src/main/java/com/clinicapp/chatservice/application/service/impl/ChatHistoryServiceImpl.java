package com.clinicapp.chatservice.application.service.impl;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.mapper.ChatMessageMapper;
import com.clinicapp.chatservice.application.service.ChatHistoryService;
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

    @Value("${chat.pagination.buckets-per-page:2}")
    private int bucketsPerPage;

    @Override
    public List<ChatMessageDto> getChatHistory(String senderId, String recipientId, int page) {
        String chatId = ChatUtils.generateChatId(senderId, recipientId);
        PageRequest pageRequest = PageRequest.of(
                page,
                bucketsPerPage,
                Sort.by(Sort.Direction.DESC, "endDate")
        );
        List<ChatBucket> buckets = chatBucketRepository.findByChatId(chatId, pageRequest);
        return buckets.stream()
                .flatMap(bucket -> bucket.getMessages().stream())
                .sorted(Comparator.comparing(ChatMessage::getTimestamp))
                .map(chatMessageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ChatMessageDto> getUserInbox(String userId) {
        List<ChatBucket> lastBuckets = chatBucketRepository.findLastBucketsForUser(userId);

        return lastBuckets.stream()
                .map(bucket -> {
                    ChatMessage lastMessage = bucket.getMessages().stream()
                            .max(Comparator.comparing(ChatMessage::getTimestamp))
                            .orElse(null);

                    return chatMessageMapper.toDto(lastMessage);
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}