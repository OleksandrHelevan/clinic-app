package com.clinicapp.aiservice.infrastructure.client.gemini;

import com.clinicapp.aiservice.application.dto.GeminiResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class GeminiClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 5000;

    public GeminiResponse sendMessage(List<Map<String, String>> history) {
        try {
            String json = buildRequestJson(history);

            for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                Request request = new Request.Builder()
                        .url(apiUrl + "?key=" + apiKey)
                        .post(RequestBody.create(json, MediaType.parse("application/json")))
                        .build();

                try (Response response = httpClient.newCall(request).execute()) {
                    if (response.isSuccessful()) {
                        String responseBody = response.body().string();
                        JsonNode root = objectMapper.readTree(responseBody);
                        String rawText = root
                                .path("candidates").get(0)
                                .path("content")
                                .path("parts").get(0)
                                .path("text").asText();

                        log.info(">>> Gemini raw response: {}", rawText);
                        return parseGeminiResponse(rawText);
                    }

                    String body = response.body() != null ? response.body().string() : "no body";
                    log.error("Gemini API error: {} body: {}", response.code(), body);

                    if (response.code() == 429 && attempt < MAX_RETRIES) {
                        log.warn("Rate limit hit, retry {}/{}", attempt, MAX_RETRIES);
                        Thread.sleep(RETRY_DELAY_MS);
                        continue;
                    }

                    return new GeminiResponse("Вибачте, сталася помилка. Спробуйте пізніше.", null);
                }
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Gemini retry interrupted: {}", e.getMessage());
        } catch (Exception e) {
            log.error("Gemini request failed: {}", e.getMessage());
        }

        return new GeminiResponse("Вибачте, сталася помилка. Спробуйте пізніше.", null);
    }

    private GeminiResponse parseGeminiResponse(String rawText) {
        try {
            String cleaned = rawText
                    .replaceAll("```json\\s*", "")
                    .replaceAll("```\\s*", "")
                    .trim();

            JsonNode node = objectMapper.readTree(cleaned);
            String message = node.path("message").asText();
            String spec = node.path("specialization").asText("NONE").trim().toUpperCase();
            String specialization = spec.isBlank() || "NONE".equals(spec) ? null : spec;

            log.info(">>> Parsed message length: {}, specialization: '{}'", message.length(), specialization);
            return new GeminiResponse(message, specialization);
        } catch (Exception e) {
            log.warn(">>> Could not parse JSON from Gemini, using raw text. Reason: {}", e.getMessage());
            return new GeminiResponse(rawText, null);
        }
    }

    private String buildRequestJson(List<Map<String, String>> history) throws Exception {
        ObjectNode requestBody = objectMapper.createObjectNode();

        ObjectNode systemInstruction = objectMapper.createObjectNode();
        ObjectNode systemPart = objectMapper.createObjectNode();
        systemPart.put("text", buildSystemPrompt());
        systemInstruction.set("parts", objectMapper.createArrayNode().add(systemPart));
        requestBody.set("systemInstruction", systemInstruction);

        ArrayNode contents = objectMapper.createArrayNode();
        for (Map<String, String> msg : history) {
            ObjectNode contentNode = objectMapper.createObjectNode();
            String role = "assistant".equals(msg.get("role")) ? "model" : "user";
            contentNode.put("role", role);
            ArrayNode parts = objectMapper.createArrayNode();
            ObjectNode part = objectMapper.createObjectNode();
            part.put("text", msg.get("content"));
            parts.add(part);
            contentNode.set("parts", parts);
            contents.add(contentNode);
        }
        requestBody.set("contents", contents);

        ObjectNode generationConfig = objectMapper.createObjectNode();
        generationConfig.put("temperature", 0.4);
        generationConfig.put("maxOutputTokens", 1024);
        generationConfig.put("responseMimeType", "application/json");
        requestBody.set("generationConfig", generationConfig);

        return objectMapper.writeValueAsString(requestBody);
    }

    private String buildSystemPrompt() {
        return """
                Ти — медичний AI асистент клініки Avyro. Допомагаєш пацієнтам розібратись із симптомами.

                Правила:
                1. Відповідай ВИКЛЮЧНО українською мовою, без markdown форматування (без **, *, #).
                2. Пояснюй зрозуміло, без зайвого медичного жаргону.
                3. НІКОЛИ не ставь діагноз — лише інформуй і рекомендуй звернутись до лікаря.
                4. При серйозних симптомах (біль у грудях, утруднене дихання) — кажи викликати швидку 103.
                5. Будь емпатичним і заспокійливим.
                6. Якщо питання не стосується здоров'я — ввічливо поясни, що ти медичний асистент.

                ОБОВ'ЯЗКОВО відповідай ТІЛЬКИ валідним JSON з двома полями:
                {
                  "message": "текст відповіді без будь-якого markdown",
                  "specialization": "НАЗВА або NONE"
                }

                Доступні значення для specialization:
                CARDIOLOGIST, NEUROLOGIST, DERMATOLOGIST, ORTHOPEDIST,
                THERAPIST, OPHTHALMOLOGIST, ENT, GASTROENTEROLOGIST, ENDOCRINOLOGIST, SURGEON.

                Якщо не можеш визначити спеціалізацію — пиши NONE.
                """;
    }
}