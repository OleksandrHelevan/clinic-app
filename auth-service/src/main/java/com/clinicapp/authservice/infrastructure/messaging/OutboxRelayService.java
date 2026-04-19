package com.clinicapp.authservice.infrastructure.messaging;

import com.clinicapp.authservice.domain.*;
import com.clinicapp.authservice.infrastructure.persistence.OutboxEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OutboxRelayService {

    private final OutboxEventRepository outboxEventRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Scheduled(fixedDelay = 5000)
    public void processOutboxEvents() {

        List<OutboxEvent> events =
                outboxEventRepository.findByStatusOrderByCreatedAtAsc(OutboxStatus.PENDING);

        if (events.isEmpty()) return;

        log.info("Found {} PENDING events", events.size());

        for (OutboxEvent event : events) {

            kafkaTemplate.send(
                    "user-registration-topic",
                    event.getAggregateId(),
                    event.getPayload()
            ).whenComplete((res, ex) -> {

                if (ex == null) {
                    event.setStatus(OutboxStatus.SENT);
                    outboxEventRepository.save(event);

                    log.info("Event {} SENT", event.getId());

                } else {
                    event.setStatus(OutboxStatus.FAILED);
                    outboxEventRepository.save(event);

                    log.error("Event {} FAILED: {}", event.getId(), ex.getMessage());
                }
            });
        }
    }
}