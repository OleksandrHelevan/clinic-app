package com.clinicapp.bookingservice.infrastructure.client;

import com.clinicapp.bookingservice.api.exception.ExternalServiceUnavailableException;
import com.clinicapp.bookingservice.api.exception.PatientNotFoundException;
import com.clinicapp.bookingservice.infrastructure.config.ServiceProperties;
import com.clinicapp.common.dto.PatientResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
@RequiredArgsConstructor
public class PatientClient {

    private final RestClient restClient;
    private final ServiceProperties serviceProperties;

    public void ensurePatientExists(String patientId) {
        String url = serviceProperties.patientServiceUrl() + "/api/v1/patients/" + patientId;

        try {
            restClient.get()
                    .uri(url)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .body(PatientResponse.class);
        } catch (RestClientResponseException ex) {
            if (ex.getStatusCode().value() == 404) {
                throw new PatientNotFoundException(patientId);
            }
            throw new ExternalServiceUnavailableException("patient-service");
        }
    }
}
