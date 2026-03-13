package com.clinicapp.doctorservice.infrastructure.client.facade;

import com.clinicapp.common.dto.PatientResponse;
import com.clinicapp.doctorservice.api.exception.PatientServiceTimeoutException;
import com.clinicapp.doctorservice.api.exception.PatientServiceUnavailableException;
import com.clinicapp.doctorservice.infrastructure.client.PatientClient;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class PatientClientFacade {

    private final PatientClient patientClient;

    @Retry(name = "patientService")
    @CircuitBreaker(name = "patientService", fallbackMethod = "getPatientFallback")
    public PatientResponse getPatientWithRetry(UUID id) {
        String correlationId = MDC.get("correlationId");
        log.info("Attempting getPatient, correlationId: {}", correlationId);
        return patientClient.getPatient(id, correlationId);
    }

    private PatientResponse getPatientFallback(UUID id, Throwable t) {
        log.warn("Fallback triggered for patientId {}: {}", id, t.toString());

        if (t instanceof java.net.http.HttpConnectTimeoutException
                || (t.getCause() != null && t.getCause() instanceof java.net.http.HttpConnectTimeoutException)) {
            throw new PatientServiceTimeoutException("Patient service request timed out", t);
        }

        throw new PatientServiceUnavailableException("Patient service is unavailable", t);
    }
}