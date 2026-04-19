package com.clinicapp.doctorservice.infrastructure.messaging;

import com.clinicapp.common.event.ProfileCreatedEvent;
import com.clinicapp.common.event.ProfileCreationFailedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class DoctorEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void sendProfileCreationFailed(ProfileCreationFailedEvent event) {
        try {
            String payload = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("profile-failed-topic", payload);

            log.warn("Sent ProfileCreationFailedEvent for userId: {}", event.getUserId());

        } catch (Exception e) {
            log.error("Failed to send ProfileCreationFailedEvent: {}", e.getMessage());
        }
    }

    public void sendProfileCreated(ProfileCreatedEvent event) {
        try {
            kafkaTemplate.send(
                    "profile-created-topic",
                    event.getUserId(),
                    objectMapper.writeValueAsString(event)
            );
        } catch (Exception e) {
            log.error("Failed to send success event", e);
        }
    }
}