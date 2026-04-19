package com.clinicapp.authservice.infrastructure.messaging;

import com.clinicapp.authservice.domain.OutboxEvent;
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
        List<OutboxEvent> pendingEvents = outboxEventRepository.findByStatusOrderByCreatedAtAsc("PENDING");

        if (!pendingEvents.isEmpty()) {
            log.info("Find {} PENDING events in Outbox. Sending...", pendingEvents.size());
        }

        for (OutboxEvent event : pendingEvents) {
            try {
                kafkaTemplate.send("user-registration-topic", event.getAggregateId(), event.getPayload());
                event.setStatus("SENT");
                outboxEventRepository.save(event);

                log.info("Event {} successfully sent and marked as SENT", event.getId());

            } catch (Exception e) {
                log.error("Error event sending: {}", e.getMessage());
            }
        }
    }
}