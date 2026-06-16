package com.clinicapp.authservice.api;

import com.clinicapp.authservice.application.dto.*;
import com.clinicapp.authservice.application.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.clinicapp.common.dto.MeContextResponse;

import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    @SecurityRequirements
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody SignUpRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    @SecurityRequirements
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.login(request.getEmail(), request.getPassword()));
    }

    @GetMapping("/users/{id}/status")
    public ResponseEntity<UserStatusResponse> status(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authService.getStatusOfUser(id));
    }

    @GetMapping("/internal/me-context")
    public MeContextResponse getMeContext(
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-Gateway-Token") String token
    ) {
        return authService.getMeContext(userId);
    }

}