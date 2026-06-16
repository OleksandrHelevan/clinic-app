package com.clinicapp.aiservice.application.service;

import com.clinicapp.aiservice.application.dto.AiMessageRequest;
import com.clinicapp.aiservice.application.dto.AiMessageResponse;
import com.clinicapp.aiservice.application.dto.GeminiResponse;
import com.clinicapp.aiservice.domains.AiChatMessage;
import com.clinicapp.aiservice.infrastructure.client.doctor.DoctorServiceClient;
import com.clinicapp.aiservice.infrastructure.client.gemini.GeminiClient;
import com.clinicapp.aiservice.infrastructure.persistence.AiChatMessageRepository;
import com.clinicapp.common.dto.DoctorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiChatService {

    private final AiChatMessageRepository repository;
    private final GeminiClient geminiClient;
    private final DoctorServiceClient doctorServiceClient;

    public AiMessageResponse chat(AiMessageRequest request) {
        repository.save(AiChatMessage.builder()
                .userId(request.getUserId())
                .role("user")
                .content(request.getMessage())
                .build());

        List<AiChatMessage> history = repository
                .findTop20ByUserIdOrderByTimestampAsc(request.getUserId());

        List<Map<String, String>> historyForGemini = history.stream()
                .map(msg -> Map.of("role", msg.getRole(), "content", msg.getContent()))
                .collect(Collectors.toList());

        GeminiResponse geminiResponse = geminiClient.sendMessage(historyForGemini);
        log.info(">>> Specialization: '{}', message length: {}",
                geminiResponse.getSpecialization(),
                geminiResponse.getMessage().length());

        repository.save(AiChatMessage.builder()
                .userId(request.getUserId())
                .role("assistant")
                .content(geminiResponse.getMessage())
                .build());

        DoctorResponse recommendedDoctor = null;
        if (geminiResponse.getSpecialization() != null) {
            List<DoctorResponse> doctors = doctorServiceClient
                    .getDoctorsBySpecialization(geminiResponse.getSpecialization(), 0, 1);
            log.info(">>> Doctors found for {}: {}", geminiResponse.getSpecialization(), doctors.size());
            if (!doctors.isEmpty()) {
                recommendedDoctor = doctors.get(0);
            }
        }

        return AiMessageResponse.builder()
                .userId(request.getUserId())
                .message(geminiResponse.getMessage())
                .role("assistant")
                .timestamp(LocalDateTime.now())
                .recommendedDoctor(recommendedDoctor)
                .build();
    }

    public List<AiMessageResponse> getHistory(String userId) {
        return repository.findTop20ByUserIdOrderByTimestampAsc(userId)
                .stream()
                .map(msg -> AiMessageResponse.builder()
                        .userId(msg.getUserId())
                        .message(msg.getContent())
                        .role(msg.getRole())
                        .timestamp(msg.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }

    public void clearHistory(String userId) {
        repository.deleteByUserId(userId);
    }
}