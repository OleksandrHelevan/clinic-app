package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.domains.event.ChatEvent;
import com.clinicapp.chatservice.application.service.ChatEventService;
import com.clinicapp.chatservice.application.service.ChatMessageService;
import com.clinicapp.chatservice.application.service.ChatRoomService;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final ChatEventService chatEventService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        log.info("Message received from {} to {}", chatMessage.getSenderId(), chatMessage.getRecipientId());

        try {
            String chatId = chatRoomService
                    .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true)
                    .orElseThrow(() -> new RuntimeException("Failed to create or find chat room"));

            ChatMessage savedMessage = chatMessageService.saveMessage(chatId, chatMessage);

            messagingTemplate.convertAndSendToUser(
                    chatMessage.getRecipientId(),
                    "/queue/messages",
                    savedMessage
            );

            log.debug("Message successfully sent to user: {}", chatMessage.getRecipientId());

        } catch (Exception e) {
            log.error("Error processing message from {}: {}",
                    chatMessage.getSenderId(), e.getMessage(), e);
        }
    }

    @MessageMapping("/chat.sendEvent")
    public void handleEvent(@Payload ChatEvent event) {
        chatEventService.processEvent(event);

        messagingTemplate.convertAndSendToUser(
                event.getRecipientId(),
                "/queue/events",
                event
        );
    }
}