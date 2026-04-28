package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.service.ChatHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    @GetMapping("/history/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessageDto>> getChatHistory(
            @PathVariable String senderId,
            @PathVariable String recipientId,
            @RequestParam(defaultValue = "0") int page) {

        List<ChatMessageDto> response = chatHistoryService
                .getChatHistory(senderId, recipientId, page);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/inbox/{userId}")
    public ResponseEntity<List<ChatMessageDto>> getInbox(@PathVariable String userId) {
        return ResponseEntity.ok(chatHistoryService.getUserInbox(userId));
    }
}