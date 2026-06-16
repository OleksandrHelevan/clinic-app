package com.clinicapp.bookingservice.application.service.impl;

import com.clinicapp.bookingservice.api.exception.*;
import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;
import com.clinicapp.bookingservice.domain.Booking;
import com.clinicapp.bookingservice.domain.BookingConstants;
import com.clinicapp.bookingservice.domain.BookingStatus;
import com.clinicapp.bookingservice.infrastructure.client.DoctorClient;
import com.clinicapp.bookingservice.infrastructure.client.PatientClient;
import com.clinicapp.bookingservice.infrastructure.persistence.BookingRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private DoctorClient doctorClient;

    @Mock
    private PatientClient patientClient;

    @InjectMocks
    private BookingServiceImpl bookingService;

    @Test
    void create_savesBookingWhenSlotIsAvailable() {
        OffsetDateTime bookedTime = OffsetDateTime.now().plusDays(1);
        CreateBookingRequest request = new CreateBookingRequest("doctor-1", bookedTime, "Checkup");

        Booking saved = Booking.builder()
                .id("booking-1")
                .doctorId("doctor-1")
                .patientId("patient-1")
                .bookedTime(bookedTime.toInstant())
                .description("Checkup")
                .status(BookingStatus.PENDING)
                .deleted(false)
                .build();

        when(bookingRepository.existsByDoctorIdAndBookedTimeAndDeletedFalseAndStatusIn(
                eq("doctor-1"),
                eq(bookedTime.toInstant()),
                eq(BookingConstants.ACTIVE_STATUSES)
        )).thenReturn(false);

        when(bookingRepository.save(any(Booking.class))).thenReturn(saved);

        var response = bookingService.create(request, "patient-1", "PATIENT");

        assertThat(response.id()).isEqualTo("booking-1");
        assertThat(response.status()).isEqualTo(BookingStatus.PENDING);

        verify(doctorClient).ensureDoctorExists("doctor-1");
        verify(patientClient).ensurePatientExists("patient-1");
    }

    @Test
    void create_rejectsPastBookingTime() {
        CreateBookingRequest request = new CreateBookingRequest(
                "doctor-1",
                OffsetDateTime.now().minusHours(1),
                null
        );

        assertThatThrownBy(() -> bookingService.create(request, "patient-1", "PATIENT"))
                .isInstanceOf(InvalidBookingTimeException.class);

        verifyNoInteractions(doctorClient, patientClient, bookingRepository);
    }

    @Test
    void create_rejectsAlreadyBookedSlot() {
        OffsetDateTime bookedTime = OffsetDateTime.now().plusDays(1);
        CreateBookingRequest request = new CreateBookingRequest("doctor-1", bookedTime, null);

        when(bookingRepository.existsByDoctorIdAndBookedTimeAndDeletedFalseAndStatusIn(
                eq("doctor-1"),
                eq(bookedTime.toInstant()),
                eq(BookingConstants.ACTIVE_STATUSES)
        )).thenReturn(true);

        assertThatThrownBy(() -> bookingService.create(request, "patient-1", "PATIENT"))
                .isInstanceOf(SlotAlreadyBookedException.class);

        verify(doctorClient).ensureDoctorExists("doctor-1");
        verify(patientClient).ensurePatientExists("patient-1");
        verify(bookingRepository, never()).save(any());
    }

    @Test
    void create_handlesRaceConditionWithDuplicateKey() {
        OffsetDateTime bookedTime = OffsetDateTime.now().plusDays(1);
        CreateBookingRequest request = new CreateBookingRequest("doctor-1", bookedTime, null);

        when(bookingRepository.existsByDoctorIdAndBookedTimeAndDeletedFalseAndStatusIn(
                eq("doctor-1"),
                eq(bookedTime.toInstant()),
                eq(BookingConstants.ACTIVE_STATUSES)
        )).thenReturn(false);

        when(bookingRepository.save(any(Booking.class)))
                .thenThrow(new DuplicateKeyException("duplicate"));

        assertThatThrownBy(() -> bookingService.create(request, "patient-1", "PATIENT"))
                .isInstanceOf(SlotAlreadyBookedException.class);
    }

    @Test
    void create_rejectsNonPatientRole() {
        CreateBookingRequest request = new CreateBookingRequest(
                "doctor-1",
                OffsetDateTime.now().plusDays(1),
                null
        );

        assertThatThrownBy(() -> bookingService.create(request, "doctor-1", "DOCTOR"))
                .isInstanceOf(ForbiddenBookingAccessException.class);
    }

    @Test
    void cancel_allowsPatientToCancelOwnBooking() {
        Booking booking = activeBooking("doctor-1", "patient-1");

        when(bookingRepository.findByIdAndDeletedFalse("booking-1"))
                .thenReturn(Optional.of(booking));

        when(bookingRepository.save(booking)).thenReturn(booking);

        var response = bookingService.cancel("booking-1", "patient-1", "PATIENT");

        assertThat(response.status()).isEqualTo(BookingStatus.CANCELLED);
    }

    @Test
    void confirm_allowsDoctorToConfirmPendingBooking() {
        Booking booking = activeBooking("doctor-1", "patient-1");

        when(bookingRepository.findByIdAndDeletedFalse("booking-1"))
                .thenReturn(Optional.of(booking));

        when(bookingRepository.save(booking)).thenReturn(booking);

        var response = bookingService.confirm("booking-1", "doctor-1", "DOCTOR");

        assertThat(response.status()).isEqualTo(BookingStatus.CONFIRMED);
    }

    @Test
    void getMyUpcoming_returnsDoctorBookings() {
        OffsetDateTime bookedTime = OffsetDateTime.now().plusDays(1);

        Booking booking = Booking.builder()
                .id("booking-1")
                .doctorId("doctor-1")
                .patientId("patient-1")
                .bookedTime(bookedTime.toInstant())
                .status(BookingStatus.PENDING)
                .deleted(false)
                .build();

        when(bookingRepository.findByDoctorIdAndDeletedFalseAndStatusInAndBookedTimeAfterOrderByBookedTimeAsc(
                eq("doctor-1"),
                eq(BookingConstants.ACTIVE_STATUSES),
                any(Instant.class)
        )).thenReturn(List.of(booking));

        var result = bookingService.getMyUpcoming("doctor-1", "DOCTOR");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).doctorId()).isEqualTo("doctor-1");
    }

    @Test
    void getMyUpcoming_rejectsUnknownRole() {
        assertThatThrownBy(() -> bookingService.getMyUpcoming("user-1", "ADMIN"))
                .isInstanceOf(ForbiddenBookingAccessException.class);
    }

    @Test
    void confirm_rejectsPatient() {
        assertThatThrownBy(() -> bookingService.confirm("booking-1", "patient-1", "PATIENT"))
                .isInstanceOf(ForbiddenBookingAccessException.class);

        verifyNoInteractions(bookingRepository);
    }

    private Booking activeBooking(String doctorId, String patientId) {
        return Booking.builder()
                .id("booking-1")
                .doctorId(doctorId)
                .patientId(patientId)
                .bookedTime(OffsetDateTime.now().plusDays(2).toInstant())
                .status(BookingStatus.PENDING)
                .deleted(false)
                .build();
    }
}