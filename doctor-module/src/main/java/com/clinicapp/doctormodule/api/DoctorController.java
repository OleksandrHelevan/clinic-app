package com.clinicapp.doctormodule.api;

import com.clinicapp.doctormodule.application.request.CreateDoctorRequest;
import com.clinicapp.doctormodule.application.response.DoctorResponse;
import com.clinicapp.doctormodule.domain.doctor.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(@RequestBody CreateDoctorRequest request) {
        return ResponseEntity.ok(doctorService.createDoctor(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctor(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }
}
