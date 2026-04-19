package com.clinicapp.doctorservice.infrastructure.messaging;

import com.clinicapp.common.event.ProfileCreatedEvent;
import com.clinicapp.common.event.ProfileCreationFailedEvent;
import com.clinicapp.common.event.UserRegisteredEvent;
import com.clinicapp.doctorservice.application.service.DoctorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class DoctorEventListener {

    private final DoctorService doctorService;
    private final ObjectMapper objectMapper;
    private final DoctorEventProducer producer;

    @KafkaListener(topics = "user-registration-topic", groupId = "doctor-group")
    public void handleUserRegistered(String jsonMessage) {

        UserRegisteredEvent event;

        try {
            event = objectMapper.readValue(jsonMessage, UserRegisteredEvent.class);
        } catch (Exception e) {
            log.error("Failed to deserialize UserRegisteredEvent: {}", e.getMessage());
            return;
        }

        if (!"DOCTOR".equalsIgnoreCase(event.getRole())) {
            log.debug("Skipping event, role is not DOCTOR: {}", event.getRole());
            return;
        }

        try {
            log.info("Creating doctor profile for userId: {}", event.getId());

            if (doctorService.existsById(event.getId())) {
                log.info("Doctor already exists, skipping userId: {}", event.getId());
                return;
            }

            doctorService.createInitialProfile(event.getId(), event.getEmail());

            producer.sendProfileCreated(
                    ProfileCreatedEvent.builder()
                            .userId(event.getId())
                            .role("DOCTOR")
                            .build()
            );

            log.info("Doctor profile created successfully for userId: {}", event.getId());

        } catch (Exception e) {

            log.error("Doctor profile creation FAILED for userId {}: {}",
                    event.getId(), e.getMessage(), e);

            producer.sendProfileCreationFailed(
                    ProfileCreationFailedEvent.builder()
                            .userId(event.getId())
                            .email(event.getEmail())
                            .role(event.getRole())
                            .sourceService("doctor-service")
                            .reason(e.getClass().getSimpleName() + ": " + e.getMessage())
                            .timestamp(System.currentTimeMillis())
                            .build()
            );
        }
    }
}