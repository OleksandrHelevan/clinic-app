package com.clinicapp.authservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;
    private String password;
    private Role role;

    @Builder.Default
    private boolean enabled = true;

    @Builder.Default
    private boolean oauthUser = false;

    private RegistrationStatus registrationStatus;
    private String failureReason;
}