package com.clinicapp.patientmodule.api;

import com.clinicapp.patientmodule.application.request.CreatePatientRequest;
import com.clinicapp.patientmodule.application.response.PatientResponse;
import com.clinicapp.patientmodule.domain.patient.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/${api.version}/patients")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(@Valid @RequestBody CreatePatientRequest request) {
        return ResponseEntity.ok(patientService.createPatient(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatient(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }
}
