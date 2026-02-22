package com.clinicapp.appointmentmodule.api;

import com.clinicapp.appointmentmodule.application.request.CreateAppointmentRequest;
import com.clinicapp.appointmentmodule.application.response.AppointmentResponse;
import com.clinicapp.appointmentmodule.domain.appointment.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(@RequestBody CreateAppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointment(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }
}
