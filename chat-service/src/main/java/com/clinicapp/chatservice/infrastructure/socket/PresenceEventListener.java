package com.clinicapp.chatservice.infrastructure.socket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class PresenceEventListener {

    private final StringRedisTemplate redisTemplate;
    private static final String ONLINE_USERS_KEY = "online_users";

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();

        if (attributes != null && attributes.containsKey("userId")) {
            String userId = (String) attributes.get("userId");
            log.info("Presence: User online -> {}", userId);
            redisTemplate.opsForHash().put(ONLINE_USERS_KEY, userId, "online");
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> attributes = headerAccessor.getSessionAttributes();

        if (attributes != null && attributes.containsKey("userId")) {
            String userId = (String) attributes.get("userId");
            log.info("Presence: User offline -> {}", userId);
            redisTemplate.opsForHash().delete(ONLINE_USERS_KEY, userId);
        }
    }
}