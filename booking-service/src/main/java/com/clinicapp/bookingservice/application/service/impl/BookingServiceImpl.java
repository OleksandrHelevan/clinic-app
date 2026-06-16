package com.clinicapp.bookingservice.application.service.impl;

import com.clinicapp.bookingservice.api.exception.*;
import com.clinicapp.bookingservice.application.dto.BookingResponse;
import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.application.mapper.BookingMapper;
import com.clinicapp.bookingservice.application.service.BookingService;
import com.clinicapp.bookingservice.domain.Booking;
import com.clinicapp.bookingservice.domain.BookingConstants;
import com.clinicapp.bookingservice.domain.BookingStatus;
import com.clinicapp.bookingservice.infrastructure.client.DoctorClient;
import com.clinicapp.bookingservice.infrastructure.client.PatientClient;
import com.clinicapp.bookingservice.infrastructure.persistence.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    @Override
    public BookingResponse create(CreateBookingRequest request, String userId, String role) {
        if (!isPatient(userId, role)) {
            throw new ForbiddenBookingAccessException();
        }

        OffsetDateTime bookedTime = request.bookedTime();
        validateFutureTime(bookedTime);

        doctorClient.ensureDoctorExists(request.doctorId());
        patientClient.ensurePatientExists(userId);
        ensureSlotAvailable(request.doctorId(), bookedTime);

        Booking booking = Booking.builder()
                .doctorId(request.doctorId())
                .patientId(userId)
                .bookedTime(bookedTime.toInstant())
                .description(request.description())
                .status(BookingStatus.PENDING)
                .deleted(false)
                .build();

        try {
            return BookingMapper.toResponse(bookingRepository.save(booking));
        } catch (DuplicateKeyException ex) {
            throw new SlotAlreadyBookedException(request.doctorId());
        }
    }

    @Override
    public BookingResponse getById(String id, String userId, String role) {
        Booking booking = findActiveBooking(id);
        assertCanViewBooking(booking, userId, role);
        return BookingMapper.toResponse(booking);
    }

    @Override
    public List<BookingResponse> getMyUpcoming(String userId, String role) {
        if (isDoctor(userId, role)) {
            return findUpcomingByDoctorId(userId);
        }
        if (isPatient(userId, role)) {
            return findUpcomingByPatientId(userId);
        }
        throw new ForbiddenBookingAccessException();
    }

    @Override
    public List<BookingResponse> getMyHistory(String userId, String role) {
        if (isDoctor(userId, role)) {
            return bookingRepository.findByDoctorIdAndDeletedFalseOrderByBookedTimeDesc(userId)
                    .stream()
                    .map(BookingMapper::toResponse)
                    .toList();
        }

        if (isPatient(userId, role)) {
            return bookingRepository.findByPatientIdAndDeletedFalseOrderByBookedTimeDesc(userId)
                    .stream()
                    .map(BookingMapper::toResponse)
                    .toList();
        }

        throw new ForbiddenBookingAccessException();
    }

    @Override
    public BookingResponse cancel(String id, String userId, String role) {
        Booking booking = findActiveBooking(id);
        assertCanModifyBooking(booking, userId, role);

        if (!BookingConstants.ACTIVE_STATUSES.contains(booking.getStatus())) {
            throw new InvalidBookingStateException("Only active bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return BookingMapper.toResponse(bookingRepository.save(booking));
    }

    @Override
    public BookingResponse confirm(String id, String userId, String role) {
        if (!isDoctor(userId, role)) {
            throw new ForbiddenBookingAccessException();
        }

        Booking booking = findActiveBooking(id);

        if (!booking.getDoctorId().equals(userId)) {
            throw new ForbiddenBookingAccessException();
        }

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new InvalidBookingStateException("Only pending bookings can be confirmed");
        }

        if (!booking.getBookedTime().isAfter(Instant.now())) {
            throw new InvalidBookingTimeException();
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        return BookingMapper.toResponse(bookingRepository.save(booking));
    }

    private List<BookingResponse> findUpcomingByDoctorId(String doctorId) {
        return bookingRepository
                .findByDoctorIdAndDeletedFalseAndStatusInAndBookedTimeAfterOrderByBookedTimeAsc(
                        doctorId,
                        BookingConstants.ACTIVE_STATUSES,
                        Instant.now()
                )
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }

    private List<BookingResponse> findUpcomingByPatientId(String patientId) {
        return bookingRepository
                .findByPatientIdAndDeletedFalseAndStatusInAndBookedTimeAfterOrderByBookedTimeAsc(
                        patientId,
                        BookingConstants.ACTIVE_STATUSES,
                        Instant.now()
                )
                .stream()
                .map(BookingMapper::toResponse)
                .toList();
    }

    private Booking findActiveBooking(String id) {
        return bookingRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new BookingNotFoundException(id));
    }

    private void ensureSlotAvailable(String doctorId, OffsetDateTime bookedTime) {
        if (bookingRepository.existsByDoctorIdAndBookedTimeAndDeletedFalseAndStatusIn(
                doctorId,
                bookedTime.toInstant(),
                BookingConstants.ACTIVE_STATUSES
        )) {
            throw new SlotAlreadyBookedException(doctorId);
        }
    }

    private void validateFutureTime(OffsetDateTime bookedTime) {
        if (!bookedTime.isAfter(OffsetDateTime.now())) {
            throw new InvalidBookingTimeException();
        }
    }

    private void assertCanViewBooking(Booking booking, String userId, String role) {
        if (isDoctor(userId, role) && booking.getDoctorId().equals(userId)) {
            return;
        }

        if (isPatient(userId, role) && booking.getPatientId().equals(userId)) {
            return;
        }

        throw new ForbiddenBookingAccessException();
    }

    private void assertCanModifyBooking(Booking booking, String userId, String role) {
        if (isDoctor(userId, role) && booking.getDoctorId().equals(userId)) {
            return;
        }

        if (isPatient(userId, role) && booking.getPatientId().equals(userId)) {
            return;
        }

        throw new ForbiddenBookingAccessException();
    }

    private boolean isDoctor(String userId, String role) {
        return userId != null
                && !userId.isBlank()
                && "DOCTOR".equalsIgnoreCase(role);
    }

    private boolean isPatient(String userId, String role) {
        return userId != null
                && !userId.isBlank()
                && "PATIENT".equalsIgnoreCase(role);
    }
}