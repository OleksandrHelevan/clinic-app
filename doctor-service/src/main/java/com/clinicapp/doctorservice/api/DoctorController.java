package com.clinicapp.doctorservice.api;

import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.doctorservice.application.dto.CreateDoctorRequest;
import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.service.DoctorService;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctor(@PathVariable String id) {
        return new ResponseEntity<>(doctorService.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(@RequestBody CreateDoctorRequest request) {
        return new ResponseEntity<>(doctorService.createDoctor(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getDoctorsBySpecialization(@RequestParam Specialization specialization,
                                                                           @RequestParam int page,
                                                                           @RequestParam int size) {
        return new ResponseEntity<>(doctorService.getDoctorsBySpecialization(specialization, page, size), HttpStatus.OK);
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientResponse> getPatient(@PathVariable UUID id) {
        return ResponseEntity.ok(doctorService.getPatientInfo(id));
    }
}