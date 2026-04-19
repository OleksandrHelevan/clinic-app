package com.clinicapp.authservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "outbox_events")
public class OutboxEvent {

    @Id
    private String id;

    private String aggregateId;
    private String eventType;
    private String payload;
    private OutboxStatus status;
    private LocalDateTime createdAt;
}