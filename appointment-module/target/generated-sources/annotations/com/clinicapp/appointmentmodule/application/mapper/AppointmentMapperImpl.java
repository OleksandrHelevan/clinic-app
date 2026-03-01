package com.clinicapp.appointmentmodule.application.mapper;

import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;
import com.clinicapp.appointmentmodule.domain.appointment.Appointment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-01T12:34:02+0200",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class AppointmentMapperImpl implements AppointmentMapper {

    @Override
    public AppointmentResponse toDto(Appointment appointment) {
        if ( appointment == null ) {
            return null;
        }

        AppointmentResponse appointmentResponse = new AppointmentResponse();

        if ( appointment.getAppointmentDate() != null ) {
            appointmentResponse.setAppointmentDate( appointment.getAppointmentDate() );
        }
        if ( appointment.getDoctorId() != null ) {
            appointmentResponse.setDoctorId( appointment.getDoctorId() );
        }
        if ( appointment.getId() != null ) {
            appointmentResponse.setId( appointment.getId() );
        }
        if ( appointment.getNotes() != null ) {
            appointmentResponse.setNotes( appointment.getNotes() );
        }
        if ( appointment.getPatientId() != null ) {
            appointmentResponse.setPatientId( appointment.getPatientId() );
        }
        if ( appointment.getStatus() != null ) {
            appointmentResponse.setStatus( appointment.getStatus() );
        }

        return appointmentResponse;
    }

    @Override
    public Appointment toEntity(CreateAppointmentRequest appointmentRequest) {
        if ( appointmentRequest == null ) {
            return null;
        }

        Appointment appointment = new Appointment();

        if ( appointmentRequest.getAppointmentDate() != null ) {
            appointment.setAppointmentDate( appointmentRequest.getAppointmentDate() );
        }
        if ( appointmentRequest.getDoctorId() != null ) {
            appointment.setDoctorId( appointmentRequest.getDoctorId() );
        }
        if ( appointmentRequest.getNotes() != null ) {
            appointment.setNotes( appointmentRequest.getNotes() );
        }
        if ( appointmentRequest.getPatientId() != null ) {
            appointment.setPatientId( appointmentRequest.getPatientId() );
        }
        if ( appointmentRequest.getStatus() != null ) {
            appointment.setStatus( appointmentRequest.getStatus() );
        }

        return appointment;
    }
}
