package com.clinicapp.appointmentmodule.domain.appointment;

import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;

import java.util.UUID;

public interface AppointmentService {
    AppointmentResponse createAppointment(CreateAppointmentRequest appointment);
    AppointmentResponse getAppointmentById(UUID id);
}
