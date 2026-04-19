package com.clinicapp.authservice.application.service;

import com.clinicapp.authservice.application.dto.*;
import com.clinicapp.authservice.domain.*;
import com.clinicapp.authservice.infrastructure.persistence.*;
import com.clinicapp.authservice.infrastructure.security.JwtService;
import com.clinicapp.common.event.UserRegisteredEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    public LoginResponse login(String email, String rawPassword) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                token,
                user.getId(),
                user.getRole(),
                3600L
        );
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
                .registrationStatus(RegistrationStatus.PROCESSING)
                .build();

        User saved = userRepository.save(user);

        try {
            UserRegisteredEvent event = new UserRegisteredEvent(
                    saved.getId(),
                    saved.getEmail(),
                    saved.getRole().name()
            );

            OutboxEvent outbox = OutboxEvent.builder()
                    .aggregateId(saved.getId())
                    .eventType("UserRegistered")
                    .payload(objectMapper.writeValueAsString(event))
                    .status(OutboxStatus.PENDING)
                    .createdAt(LocalDateTime.now())
                    .build();

            outboxEventRepository.save(outbox);

        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize event", e);
        }

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getRole());
    }

    public UserStatusResponse getStatusOfUser(String id){

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserStatusResponse(
                        user.getId(),
                        user.getRegistrationStatus(),
                        user.getFailureReason()
                );
    }
}