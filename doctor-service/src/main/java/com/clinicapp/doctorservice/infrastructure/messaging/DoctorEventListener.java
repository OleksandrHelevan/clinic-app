package com.clinicapp.doctorservice.infrastructure.messaging;

import com.clinicapp.doctorservice.application.service.DoctorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.clinicapp.common.event.UserRegisteredEvent;
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

    @KafkaListener(topics = "user-registration-topic", groupId = "doctor-group")
    public void handleUserRegistered(String jsonMessage) {
        log.info("Kafka (Doctor Service): Отримано сирий JSON: {}", jsonMessage);

        try {
            UserRegisteredEvent event = objectMapper.readValue(jsonMessage, UserRegisteredEvent.class);
            if ("DOCTOR".equalsIgnoreCase(event.getRole())) {
                log.info("Створюємо профіль лікаря для userId: {}", event.getId());
                doctorService.createInitialProfile(event.getId(), event.getEmail());
            } else {
                log.debug("Пропускаємо івент: роль {} не є DOCTOR", event.getRole());
            }

        } catch (Exception e) {
            log.error("Помилка десеріалізації JSON з Кафки у Doctor Service: {}", e.getMessage());
        }
    }
}