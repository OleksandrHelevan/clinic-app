package com.clinicapp.bookingservice.infrastructure.persistence;

import com.clinicapp.bookingservice.domain.Booking;
import com.clinicapp.bookingservice.domain.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends MongoRepository<Booking, String> {

    Optional<Booking> findByIdAndDeletedFalse(String id);

    boolean existsByDoctorIdAndBookedTimeAndDeletedFalseAndStatusIn(
            String doctorId,
            Instant bookedTime,
            Collection<BookingStatus> statuses
    );

    List<Booking> findByDoctorIdAndDeletedFalseAndStatusInAndBookedTimeAfterOrderByBookedTimeAsc(
            String doctorId,
            Collection<BookingStatus> statuses,
            Instant after
    );

    List<Booking> findByPatientIdAndDeletedFalseAndStatusInAndBookedTimeAfterOrderByBookedTimeAsc(
            String patientId,
            Collection<BookingStatus> statuses,
            Instant after
    );

    List<Booking> findByDoctorIdAndDeletedFalseOrderByBookedTimeDesc(String doctorId);

    List<Booking> findByPatientIdAndDeletedFalseOrderByBookedTimeDesc(String patientId);
}