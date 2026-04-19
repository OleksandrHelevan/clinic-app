package com.clinicapp.authservice.application.service;

import com.clinicapp.authservice.application.dto.LoginResponse;
import com.clinicapp.authservice.application.dto.SignUpRequest;
import com.clinicapp.authservice.application.dto.UserResponse;
import com.clinicapp.authservice.domain.OutboxEvent;
import com.clinicapp.authservice.domain.User;
import com.clinicapp.authservice.infrastructure.persistence.OutboxEventRepository;
import com.clinicapp.authservice.infrastructure.persistence.UserRepository;
import com.clinicapp.authservice.infrastructure.security.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OutboxEventRepository outboxEventRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    @Value("${security.jwt.expiration}")
    private Long expiration;

    public LoginResponse login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user);
        return new LoginResponse(token, user.getId(), user.getRole(), expiration);
    }

    @Transactional
    public UserResponse register(SignUpRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .enabled(true)
                .oauthUser(false)
                .build();

        User saved = userRepository.save(user);
        try {
            com.clinicapp.common.event.UserRegisteredEvent event = new com.clinicapp.common.event.UserRegisteredEvent(
                    saved.getId(), saved.getEmail(), saved.getRole().name()
            );

            OutboxEvent outboxEvent = OutboxEvent.builder()
                    .aggregateId(saved.getId())
                    .eventType("UserRegistered")
                    .payload(objectMapper.writeValueAsString(event))
                    .status("PENDING")
                    .createdAt(LocalDateTime.now())
                    .build();

            outboxEventRepository.save(outboxEvent);

        } catch (Exception e) {
            throw new RuntimeException("Помилка серіалізації події", e);
        }

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }
}