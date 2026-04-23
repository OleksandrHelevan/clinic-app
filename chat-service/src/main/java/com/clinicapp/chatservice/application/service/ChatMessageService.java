package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final MongoTemplate mongoTemplate;
    private static final int BUCKET_SIZE = 50;

    public ChatMessage saveMessage(String chatId, ChatMessage message) {
        message.setTimestamp(LocalDateTime.now());
        message.setStatus(MessageStatus.RECEIVED);

        Query query = new Query(Criteria.where("chatId").is(chatId).and("count").lt(BUCKET_SIZE));

        Update update = new Update()
                .push("messages", message)
                .inc("count", 1)
                .set("endDate", message.getTimestamp())
                .setOnInsert("startDate", message.getTimestamp());

        mongoTemplate.upsert(query, update, ChatBucket.class);

        return message;
    }

    public List<ChatMessage> getChatHistory(String chatId, int page) {
        int bucketsPerPage = 2;
        Query query = new Query(Criteria.where("chatId").is(chatId))
                .with(Sort.by(Sort.Direction.DESC, "endDate"))
                .skip((long) page * bucketsPerPage)
                .limit(bucketsPerPage);

        List<ChatBucket> buckets = mongoTemplate.find(query, ChatBucket.class);
        return buckets.stream()
                .flatMap(bucket -> bucket.getMessages().stream())
                .sorted(Comparator.comparing(ChatMessage::getTimestamp))
                .collect(Collectors.toList());
    }
}