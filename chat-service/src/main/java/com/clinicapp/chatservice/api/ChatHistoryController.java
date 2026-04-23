package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.application.service.ChatMessageService;
import com.clinicapp.chatservice.application.service.ChatRoomService;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatHistoryController {

    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;

    @GetMapping("/history/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> getChatHistory(
            @PathVariable String senderId,
            @PathVariable String recipientId,
            @RequestParam(defaultValue = "0") int page) {

        String chatId = chatRoomService.getChatId(senderId, recipientId, false)
                .orElse(null);

        if (chatId == null) {
            return ResponseEntity.ok(List.of());
        }

        List<ChatMessage> history = chatMessageService.getChatHistory(chatId, page);

        return ResponseEntity.ok(history);
    }
}