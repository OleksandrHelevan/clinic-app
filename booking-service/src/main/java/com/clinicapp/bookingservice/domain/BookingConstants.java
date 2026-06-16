package com.clinicapp.bookingservice.domain;

import java.util.EnumSet;
import java.util.Set;

public final class BookingConstants {

    public static final Set<BookingStatus> ACTIVE_STATUSES =
            EnumSet.of(BookingStatus.PENDING, BookingStatus.CONFIRMED);

    private BookingConstants() {
    }
}
