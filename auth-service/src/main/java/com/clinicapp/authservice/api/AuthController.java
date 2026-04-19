package com.clinicapp.authservice.api;

import com.clinicapp.authservice.application.dto.LoginRequest;
import com.clinicapp.authservice.application.dto.LoginResponse;
import com.clinicapp.authservice.application.dto.SignUpRequest;
import com.clinicapp.authservice.application.dto.UserResponse;
import com.clinicapp.authservice.application.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1")
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

}