package com.clinicapp.appointmentmodule.application.mapper;

import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;
import com.clinicapp.appointmentmodule.domain.appointment.Appointment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-22T15:17:11+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public AppointmentResponse toDto(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentResponse appointmentResponse = new AppointmentResponse();

        return appointmentResponse;
    }

    @Override
    public Appointment toEntity(CreateAppointmentRequest appointmentRequest) {
        if ( appointmentRequest == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        return appointment;
    }
}
