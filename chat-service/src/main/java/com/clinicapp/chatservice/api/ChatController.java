package com.clinicapp.chatservice.api;

import com.clinicapp.chatservice.application.ChatMessageService;
import com.clinicapp.chatservice.application.ChatRoomService;
import com.clinicapp.chatservice.domains.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        System.out.println("📩 1. Отримано повідомлення в контролері: " + chatMessage.getContent());

        try {
            String chatId = chatRoomService
                    .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true)
                    .orElseThrow(() -> new RuntimeException("Не вдалося створити/знайти кімнату!"));

            System.out.println("✅ 2. Кімната знайдена: " + chatId);

            ChatMessage savedMessage = chatMessageService.saveMessage(chatId, chatMessage);

            System.out.println("💾 3. Успішно збережено в Mongo!");

            messagingTemplate.convertAndSendToUser(
                    chatMessage.getRecipientId(),
                    "/queue/messages",
                    savedMessage
            );

            System.out.println("🚀 4. Відправлено в сокет отримувачу: " + chatMessage.getRecipientId());

        } catch (Exception e) {
            System.err.println("❌ ПОМИЛКА під час обробки повідомлення: " + e.getMessage());
            e.printStackTrace();
        }
    }
}