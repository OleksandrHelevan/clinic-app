package com.clinicapp.medicalrecordmodule.api;

import com.clinicapp.medicalrecordmodule.application.request.CreateMedicalRecordRequest;
import com.clinicapp.medicalrecordmodule.application.response.MedicalRecordResponse;
import com.clinicapp.medicalrecordmodule.domain.medicalrecord.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @Autowired
    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public ResponseEntity<MedicalRecordResponse> createMedicalRecord(@RequestBody CreateMedicalRecordRequest request) {
        return ResponseEntity.ok(medicalRecordService.createMedicalRecord(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordResponse> getMedicalRecord(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordById(id));
    }
}
