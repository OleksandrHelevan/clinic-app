package com.clinicapp.common.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileCreationFailedEvent {
    private String userId;
    private String email;
    private String role;
    private String sourceService;
    private String reason;
    private long timestamp;
}