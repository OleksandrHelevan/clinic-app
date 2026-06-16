package com.clinicapp.aiservice.infrastructure.client.doctor;

import com.clinicapp.aiservice.application.dto.PageResponse;
import com.clinicapp.common.dto.DoctorResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DoctorServiceClient {

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper;

    @Value("${services.doctor-service.url}")
    private String doctorServiceUrl;

    public List<DoctorResponse> getDoctorsBySpecialization(String specialization, int page, int size) {
        String url = doctorServiceUrl + "/api/v1/doctors?specialization=" + specialization
                + "&page=" + page + "&size=" + size;
        log.info(">>> Calling doctor-service: {}", url);
        try {
            Request request = new Request.Builder().url(url).get().build();
            try (Response response = httpClient.newCall(request).execute()) {
                String body = response.body() != null ? response.body().string() : "null";
                log.info(">>> Doctor-service response code: {}, body: {}", response.code(), body);

                if (response.isSuccessful()) {
                    PageResponse<DoctorResponse> pageResponse = objectMapper.readValue(
                            body,
                            new TypeReference<>() {}
                    );
                    return pageResponse.getContent();
                }
            }
        } catch (Exception e) {
            log.error(">>> Failed to fetch doctors: {}", e.getMessage(), e);
        }
        return List.of();
    }
}