package com.clinicapp.bookingservice.application.service;

import com.clinicapp.bookingservice.application.dto.BookingResponse;
import com.clinicapp.bookingservice.application.dto.CreateBookingRequest;

import java.util.List;

public interface BookingService {

    BookingResponse create(CreateBookingRequest request, String userId, String role);

    BookingResponse getById(String id, String userId, String role);

    List<BookingResponse> getMyUpcoming(String userId, String role);

    List<BookingResponse> getMyHistory(String userId, String role);

    BookingResponse cancel(String id, String userId, String role);

    BookingResponse confirm(String id, String userId, String role);
}
