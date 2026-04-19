package com.clinicapp.common.event;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileCreatedEvent {
    private String userId;
    private String role;
}