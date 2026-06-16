package com.clinicapp.chatservice.application.mapper;

import com.clinicapp.chatservice.application.dto.ChatMessageDto;
import com.clinicapp.chatservice.application.dto.SendMessageRequest;
import com.clinicapp.chatservice.application.mapper.config.MapperConfig;
import com.clinicapp.chatservice.domains.message.ChatMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.UUID;

@Mapper(componentModel = "spring", imports = UUID.class, config = MapperConfig.class)
public interface ChatMessageMapper {

    @Mapping(target = "id", expression = "java(UUID.randomUUID().toString())")
    @Mapping(target = "timestamp", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "isLiked", ignore = true)
    ChatMessage toEntity(SendMessageRequest request);

    @Mapping(source = "liked", target = "isLiked")
    ChatMessageDto toDto(ChatMessage message);
}