package com.clinicapp.aiservice.infrastructure.persistence;

import com.clinicapp.aiservice.domains.AiChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AiChatMessageRepository extends MongoRepository<AiChatMessage, String> {
    List<AiChatMessage> findTop20ByUserIdOrderByTimestampAsc(String userId);
    void deleteByUserId(String userId);
}