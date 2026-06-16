package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.application.dto.ChatHistoryResponse;
import com.clinicapp.chatservice.application.dto.ChatInboxItem;
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
    public ResponseEntity<ChatHistoryResponse> getChatHistory(
            @PathVariable String senderId,
            @PathVariable String recipientId,
            @RequestParam(defaultValue = "0") int page) {

        ChatHistoryResponse response = chatHistoryService
                .getChatHistory(senderId, recipientId, page);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/inbox/{userId}")
    public ResponseEntity<List<ChatInboxItem>> getInbox(@PathVariable String userId) {
        return ResponseEntity.ok(chatHistoryService.getUserInbox(userId));
    }
}