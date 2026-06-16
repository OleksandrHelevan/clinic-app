package com.clinicapp.bookingservice.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bookings")
@CompoundIndex(
        name = "doctor_time_active_unique_idx",
        def = "{'doctorId': 1, 'bookedTime': 1}",
        unique = true,
        partialFilter = "{'deleted': false, 'status': {'$in': ['PENDING', 'CONFIRMED']}}"
)
public class Booking {

    @Id
    private String id;
    @Indexed
    private String doctorId;
    @Indexed
    private String patientId;
    @Indexed
    private Instant bookedTime;

    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;
    private String description;
    private BookingStatus status;
    @Version
    private Long version;
    @Builder.Default
    private boolean deleted = false;
}