package com.clinicapp.authservice.infrastructure.messaging;

import com.clinicapp.authservice.domain.*;
import com.clinicapp.authservice.infrastructure.persistence.UserRepository;
import com.clinicapp.common.event.ProfileCreatedEvent;
import com.clinicapp.common.event.ProfileCreationFailedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthEventListener {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "profile-failed-topic", groupId = "auth-group")
    public void handle(String json) {

        try {
            ProfileCreationFailedEvent event =
                    objectMapper.readValue(json, ProfileCreationFailedEvent.class);

            log.warn("Saga FAILED for userId: {}", event.getUserId());

            userRepository.findById(event.getUserId()).ifPresent(user -> {
                user.setRegistrationStatus(RegistrationStatus.FAILED);
                user.setFailureReason(event.getReason());
                userRepository.save(user);
            });

        } catch (Exception e) {
            log.error("Failed to handle saga failure: {}", e.getMessage());
        }
    }
    @KafkaListener(topics = "profile-created-topic", groupId = "auth-group")
    public void handleSuccess(String json) {

        try {
            ProfileCreatedEvent event =
                    objectMapper.readValue(json, ProfileCreatedEvent.class);

            userRepository.findById(event.getUserId()).ifPresent(user -> {
                user.setRegistrationStatus(RegistrationStatus.COMPLETED);
                userRepository.save(user);
            });

        } catch (Exception e) {
            log.error("Failed to process success event", e);
        }
    }
}