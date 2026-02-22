package com.clinicapp.appointmentmodule.application.service;

import com.clinicapp.appointmentmodule.application.mapper.AppointmentMapper;
import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;
import com.clinicapp.appointmentmodule.domain.appointment.Appointment;
import com.clinicapp.appointmentmodule.domain.appointment.AppointmentService;
import com.clinicapp.appointmentmodule.exception.AppointmentNotFoundException;
import com.clinicapp.appointmentmodule.infrastructure.persistence.AppointmentRepository;
import com.clinicapp.appointmentmodule.infrastructure.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
    }

    @Override
    @Transactional
    public AppointmentResponse createAppointment(CreateAppointmentRequest appointment) {
        Appointment appointmentEntity = appointmentMapper.toEntity(appointment);
        return appointmentMapper.toDto(appointmentRepository.save(appointmentEntity));
    }

    @Override
    public AppointmentResponse getAppointmentById(UUID id) {
        return appointmentMapper
                .toDto(appointmentRepository
                        .findById(id)
                        .orElseThrow(() -> new AppointmentNotFoundException(
                                ErrorMessage.APPOINTMENT_NOT_FOUND
                        )));
    }
}
