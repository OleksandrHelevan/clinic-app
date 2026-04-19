package com.clinicapp.authservice.infrastructure.persistence;

import com.clinicapp.authservice.domain.OutboxEvent;
import com.clinicapp.authservice.domain.OutboxStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutboxEventRepository extends MongoRepository<OutboxEvent, String> {
    List<OutboxEvent> findByStatusOrderByCreatedAtAsc(OutboxStatus status);
}
