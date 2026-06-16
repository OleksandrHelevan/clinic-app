package com.clinicapp.aiservice.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "ai_chat_messages")
public class AiChatMessage {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String role;
    private String content;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}