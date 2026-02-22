package com.clinicapp.appointmentmodule.application.mapper;

import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;
import com.clinicapp.appointmentmodule.config.MapperConfig;
import com.clinicapp.appointmentmodule.domain.appointment.Appointment;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface AppointmentMapper {
    AppointmentResponse toDto(Appointment appointment);
    Appointment toEntity(CreateAppointmentRequest appointmentRequest);
}
