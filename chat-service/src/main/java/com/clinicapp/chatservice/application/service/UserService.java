package com.clinicapp.chatservice.application.service;

import com.clinicapp.chatservice.infrastructure.client.DoctorClient;
import com.clinicapp.chatservice.infrastructure.client.PatientClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final DoctorClient doctorClient;
    private final PatientClient patientClient;

    public String getUserFullName(String userId) {
        try {
            var doctor = doctorClient.getDoctorById(userId);
            if (doctor != null && doctor.firstName() != null) {
                return doctor.firstName() + " " + doctor.lastName();
            }
        } catch (Exception e) {
            log.debug("User {} is not a doctor, checking patient service. Message: {}", userId, e.getMessage());
        }
        try {
            var patient = patientClient.getPatientById(userId);
            if (patient != null && patient.firstName() != null) {
                return patient.firstName() + " " + patient.lastName();
            }
        } catch (Exception e) {
            log.error("Failed to fetch user name from Patient Service for ID: {}", userId, e);
        }
        return "Unknown User";
    }
}