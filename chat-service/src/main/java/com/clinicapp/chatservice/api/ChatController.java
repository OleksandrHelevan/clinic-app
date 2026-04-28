package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.dto.SendMessageRequest;
import com.clinicapp.chatservice.application.service.ChatMessageService;
import com.clinicapp.chatservice.domains.event.ChatEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload @Valid SendMessageRequest request) {
        try {
            ChatMessageDto savedMessageDto = chatMessageService.saveMessage(request);

            messagingTemplate.convertAndSendToUser(
                    request.getRecipientId(),
                    "/queue/messages",
                    savedMessageDto
            );
            messagingTemplate.convertAndSendToUser(
                    request.getSenderId(),
                    "/queue/messages",
                    savedMessageDto
            );

        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
        }
    }

    @MessageMapping("/chat.sendEvent")
    public void handleEvent(@Payload ChatEvent event) {
        chatMessageService.processEvent(event);
        messagingTemplate.convertAndSendToUser(event.getRecipientId(), "/queue/events", event);
    }
}