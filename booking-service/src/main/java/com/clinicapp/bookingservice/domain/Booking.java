package com.clinicapp.bookingservice.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bookings")
@CompoundIndex(
        name = "doctor_time_unique_idx",
        def = "{'doctorId': 1, 'bookedTime': 1}",
        unique = true
)
public class Booking {

    @Id
    private UUID id;
    @Indexed
    private UUID doctorId;
    @Indexed
    private UUID patientId;
    @Indexed
    private OffsetDateTime bookedTime;

    @CreatedDate
    private OffsetDateTime createdAt;
    @LastModifiedDate
    private OffsetDateTime updatedAt;
    private String description;
    private BookingStatus status;
    @Version
    private Long version;
    @Builder.Default
    private boolean deleted = false;
}