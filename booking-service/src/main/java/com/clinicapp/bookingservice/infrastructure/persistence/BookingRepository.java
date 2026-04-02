package com.clinicapp.bookingservice.infrastructure.persistence;

import com.clinicapp.bookingservice.domain.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;

public interface BookingRepository extends MongoRepository<Booking, UUID> {
}
