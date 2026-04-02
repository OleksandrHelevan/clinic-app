package com.clinicapp.authservice.api;

import com.clinicapp.authservice.application.service.dto.LoginRequest;
import com.clinicapp.authservice.application.service.dto.LoginResponse;
import com.clinicapp.authservice.application.service.dto.SignUpRequest;
import com.clinicapp.authservice.application.service.dto.UserResponse;
import com.clinicapp.authservice.infrastructure.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<String> oauth2Success() {
        return ResponseEntity.ok("OAuth2 login successful!");
    }

}