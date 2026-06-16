package com.clinicapp.bookingservice.infrastructure.client;

import com.clinicapp.bookingservice.api.exception.DoctorNotFoundException;
import com.clinicapp.bookingservice.api.exception.ExternalServiceUnavailableException;
import com.clinicapp.bookingservice.infrastructure.config.ServiceProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
@RequiredArgsConstructor
public class DoctorClient {

    private final RestClient restClient;
    private final ServiceProperties serviceProperties;

    public void ensureDoctorExists(String doctorId) {
        String url = serviceProperties.doctorServiceUrl() + "/api/v1/doctors/" + doctorId;

        try {
            restClient.get()
                    .uri(url)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientResponseException ex) {
            if (ex.getStatusCode().value() == 404) {
                throw new DoctorNotFoundException(doctorId);
            }
            throw new ExternalServiceUnavailableException("doctor-service");
        }
    }
}
