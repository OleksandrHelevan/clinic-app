package com.clinicapp.chatservice.infrastructure.client;


import com.clinicapp.chatservice.application.dto.DoctorChatResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "doctor-service", url = "${services.doctor-service.url}")
public interface DoctorClient {

    @GetMapping("/api/v1/doctors/{id}")
    DoctorChatResponse getDoctorById(@PathVariable("id") String id);
}