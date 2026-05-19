package com.clinicapp.chatservice.infrastructure.client;

import com.clinicapp.chatservice.application.dto.PatientChatResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "patient-service", url = "${services.patient-service.url}")
public interface PatientClient {

    @GetMapping("/api/v1/patients/{id}")
    PatientChatResponse getPatientById(@PathVariable("id") String id);
}