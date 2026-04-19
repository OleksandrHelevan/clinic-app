package com.clinicapp.patientservice.infrastructure.messaging;

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

    @KafkaListener(topics = "user-registration-topic", groupId = "patient-group")
    public void handleUserRegistered(String jsonMessage) {
        log.info("Kafka: Отримано сирий JSON: {}", jsonMessage);

        try {
            UserRegisteredEvent event = objectMapper.readValue(jsonMessage, UserRegisteredEvent.class);

            if ("PATIENT".equalsIgnoreCase(event.getRole())) {
                log.info("Створюємо профіль пацієнта для userId: {}", event.getId());
                patientService.createInitialProfile(event.getId(), event.getEmail());
            }

        } catch (Exception e) {
            log.error("Помилка десеріалізації JSON з Кафки: {}", e.getMessage());
        }
    }
}