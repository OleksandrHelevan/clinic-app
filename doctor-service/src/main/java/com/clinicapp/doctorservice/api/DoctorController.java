package com.clinicapp.doctorservice.api;

import com.clinicapp.doctorservice.application.dto.AddDoctorProfileRequest;
import com.clinicapp.doctorservice.application.dto.DoctorResponse;
import com.clinicapp.doctorservice.application.service.DoctorService;
import com.clinicapp.doctorservice.domain.doctor.Specialization;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/me")
    public ResponseEntity<DoctorResponse> getMyProfile(
            @Parameter(hidden = true)
            @RequestHeader(value = "X-User-Id") String userId) {
        log.info("Fetching own doctor profile for userId: {}", userId);
        return new ResponseEntity<>(doctorService.getById(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable String id) {
        log.info("Fetching doctor profile by id: {}", id);
        return new ResponseEntity<>(doctorService.getById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<DoctorResponse>> getDoctorsBySpecialization(
            @RequestParam Specialization specialization,
            @RequestParam int page,
            @RequestParam int size) {
        log.info("Searching doctors. Specialization: {}, Page: {}, Size: {}", specialization, page, size);
        return new ResponseEntity<>(doctorService.getDoctorsBySpecialization(specialization, page, size), HttpStatus.OK);
    }

    @PatchMapping("/profile")
    public ResponseEntity<DoctorResponse> updateMyDoctorProfile(
            @Valid @RequestBody AddDoctorProfileRequest request,
            @Parameter(hidden = true)
            @RequestHeader(value = "X-User-Id") String userId) {
        log.info("Initiating profile update for userId: {}", userId);
        DoctorResponse updatedProfile = doctorService.addDoctorProfile(userId, request);
        log.info("Profile successfully updated for userId: {}", userId);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProfile);
    }
}