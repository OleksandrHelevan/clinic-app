package com.clinicapp.patientservice.infrastructure.messaging;

import com.clinicapp.common.event.ProfileCreatedEvent;
import com.clinicapp.common.event.ProfileCreationFailedEvent;
import com.clinicapp.common.event.UserRegisteredEvent;
import com.clinicapp.patientservice.application.service.PatientService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class PatientEventListener {

    private final PatientService patientService;
    private final ObjectMapper objectMapper;
    private final PatientEventProducer producer;


    @KafkaListener(topics = "user-registration-topic", groupId = "patient-group")
    public void handleUserRegistered(String jsonMessage) {

        UserRegisteredEvent event;

        try {
            event = objectMapper.readValue(jsonMessage, UserRegisteredEvent.class);
        } catch (Exception e) {
            log.error("Failed to deserialize UserRegisteredEvent: {}", e.getMessage());
            return;
        }

        if (!"PATIENT".equalsIgnoreCase(event.getRole())) {
            log.debug("Skipping event, role is not PATIENT: {}", event.getRole());
            return;
        }

        try {
            log.info("Creating Patient profile for userId: {}", event.getId());

            if (patientService.existsById(event.getId())) {
                log.info("Patient already exists, skipping userId: {}", event.getId());
                return;
            }

            patientService.createInitialProfile(event.getId(), event.getEmail());

            producer.sendProfileCreated(
                    ProfileCreatedEvent.builder()
                            .userId(event.getId())
                            .role("PATIENT")
                            .build()
            );

            log.info("Patient profile created successfully for userId: {}", event.getId());

        } catch (Exception e) {

            log.error("Patient profile creation FAILED for userId {}: {}",
                    event.getId(), e.getMessage(), e);

            producer.sendProfileCreationFailed(
                    ProfileCreationFailedEvent.builder()
                            .userId(event.getId())
                            .email(event.getEmail())
                            .role(event.getRole())
                            .sourceService("patient-service")
                            .reason(e.getClass().getSimpleName() + ": " + e.getMessage())
                            .timestamp(System.currentTimeMillis())
                            .build()
            );
        }
    }
}