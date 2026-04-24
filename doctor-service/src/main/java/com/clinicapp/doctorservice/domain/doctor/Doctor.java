package com.clinicapp.doctorservice.domain.doctor;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.time.OffsetDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;

    @Field("first_name")
    private String firstName;

    @Field("last_name")
    private String lastName;

    @Indexed
    private Specialization specialization;

    @Indexed(unique = true)
    private String email;

    @Indexed
    private String phone;

    @Field("avatar_url")
    private String avatarUrl;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Builder.Default
    private boolean deleted = false;
}