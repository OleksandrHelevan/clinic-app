package com.clinicapp.chatservice.infrastructure.persistence;

import com.clinicapp.chatservice.domains.bucket.ChatBucket;
import com.clinicapp.chatservice.domains.message.MessageStatus;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatBucketRepository extends MongoRepository<ChatBucket, String>, ChatBucketCustomRepository {

    List<ChatBucket> findByChatId(String chatId, Pageable pageable);

    Optional<ChatBucket> findFirstByChatIdOrderByEndDateDesc(String chatId);

    @Query("{ 'messages.id': ?0 }")
    @Update("{ '$set': { 'messages.$.status': ?1 } }")
    long updateMessageStatus(String messageId, MessageStatus status);

    @Query("{ 'messages.id': ?0 }")
    @Update("{ '$set': { 'messages.$.isLiked': ?1 } }")
    long updateMessageLikeStatus(String messageId, boolean isLiked);

    @Aggregation(pipeline = {
            "{ $match: { chatId: { $regex: ?0 } } }",
            "{ $sort: { endDate: -1 } }",
            "{ $group: { _id: '$chatId', latestBucket: { $first: '$$ROOT' } } }",
            "{ $replaceRoot: { newRoot: '$latestBucket' } }",
            "{ $sort: { endDate: -1 } }"
    })
    List<ChatBucket> findLastBucketsForUser(String userIdRegex);
}