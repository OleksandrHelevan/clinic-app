package com.clinicapp.authservice.application.service.dto;

import com.clinicapp.authservice.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String userId;
    private Role role;
    private long exp;
}