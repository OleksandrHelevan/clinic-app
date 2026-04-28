package com.clinicapp.chatservice.infrastructure.persistence.impl;

import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import com.clinicapp.chatservice.infrastructure.persistence.ChatBucketCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

@RequiredArgsConstructor
public class ChatBucketRepositoryImpl implements ChatBucketCustomRepository {

    private final MongoTemplate mongoTemplate;

    @Override
    public long markMessagesAsRead(String chatId, String senderId) {
        Query query = new Query(Criteria.where("chatId").is(chatId)
                .and("messages.senderId").is(senderId)
                .and("messages.status").ne(MessageStatus.READ));

        Update update = new Update().set("messages.$[msg].status", MessageStatus.READ)
                .filterArray(Criteria.where("msg.senderId").is(senderId)
                        .and("msg.status").ne(MessageStatus.READ));

        var result = mongoTemplate.updateMulti(query, update, ChatBucket.class);
        return result.getModifiedCount();
    }
}