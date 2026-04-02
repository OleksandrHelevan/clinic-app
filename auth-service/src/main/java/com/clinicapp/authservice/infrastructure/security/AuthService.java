package com.clinicapp.authservice.infrastructure.security;

import com.clinicapp.authservice.application.service.dto.LoginResponse;
import com.clinicapp.authservice.application.service.dto.SignUpRequest;
import com.clinicapp.authservice.application.service.dto.UserResponse;
import com.clinicapp.authservice.domain.Role;
import com.clinicapp.authservice.domain.User;
import com.clinicapp.authservice.infrastructure.persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
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

    public String oauthLogin(String email, String fullName, Role role) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(email)
                        .role(role)
                        .oauthUser(true)
                        .enabled(true)
                        .build()));

        return jwtService.generateToken(user);
    }

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
         return new UserResponse(user.getId(), user.getEmail(), user.getRole());
    }
}