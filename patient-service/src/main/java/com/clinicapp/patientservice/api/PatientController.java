package com.clinicapp.patientservice.api;

import com.clinicapp.patientservice.application.dto.CreatePatientRequest;
import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.patientservice.application.service.PatientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/me")
    public ResponseEntity<PatientResponse> getMyProfile(
            @RequestHeader(value = "X-User-Id") String userId) {
        log.info("Fetching own patient profile for userId: {}", userId);
        return new ResponseEntity<>(patientService.getPatientById(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(@PathVariable String id) {
        log.info("Fetching patient profile by id: {}", id);
        return new ResponseEntity<>(patientService.getPatientById(id), HttpStatus.OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<PatientResponse> updateMyProfile(
            @RequestBody CreatePatientRequest request,
            @RequestHeader(value = "X-User-Id") String userId) {
        log.info("Creating or updating patient profile for userId: {}", userId);
        return new ResponseEntity<>(patientService.createPatient(request), HttpStatus.CREATED);
    }
}