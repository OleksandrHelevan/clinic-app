package com.clinicapp.chatservice.domains.bucket;

import com.clinicapp.chatservice.domains.message.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "chat_buckets")
@CompoundIndex(name = "chat_id_end_date_idx", def = "{'chatId': 1, 'endDate': -1}")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatBucket {
    @Id
    private String id;

    private String chatId;
    private int count;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @Builder.Default
    private List<ChatMessage> messages = new ArrayList<>();
}