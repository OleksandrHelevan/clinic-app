package com.clinicapp.aiservice.api;

import com.clinicapp.aiservice.application.dto.AiMessageRequest;
import com.clinicapp.aiservice.application.dto.AiMessageResponse;
import com.clinicapp.aiservice.application.service.AiChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public ResponseEntity<AiMessageResponse> chat(@Valid @RequestBody AiMessageRequest request) {
        return ResponseEntity.ok(aiChatService.chat(request));
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<AiMessageResponse>> getHistory(@PathVariable String userId) {
        return ResponseEntity.ok(aiChatService.getHistory(userId));
    }

    @DeleteMapping("/history/{userId}")
    public ResponseEntity<Void> clearHistory(@PathVariable String userId) {
        aiChatService.clearHistory(userId);
        return ResponseEntity.noContent().build();
    }
}