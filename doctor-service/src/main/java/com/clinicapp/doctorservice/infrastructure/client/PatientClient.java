package com.clinicapp.doctorservice.infrastructure.client;

import com.clinicapp.common.dto.PatientResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class PatientClient {

    private final RestClient restClient;

    public PatientResponse getPatient(UUID patientId, String correlationId) {
        String url = "http://patient-service:8081/api/v1/patients/" + patientId;

        return restClient.get()
                .uri(url)
                .header("X-Correlation-Id", correlationId != null ? correlationId : "")
                .retrieve()
                .body(PatientResponse.class);
    }
}
