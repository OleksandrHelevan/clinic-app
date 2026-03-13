package com.clinicapp.doctorservice.infrastructure.client.config;

import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryRegistry;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class Resilience4jEventsConfig {

    private final RetryRegistry retryRegistry;

    @PostConstruct
    public void addListeners() {
        System.out.println(">>> Available retry instances: " + retryRegistry.getAllRetries().stream()
                .map(Retry::getName)
                .toList());

        retryRegistry.retry("patientService").getEventPublisher()
                .onRetry(e -> System.out.println(">>> RETRY attempt #" + e.getNumberOfRetryAttempts()))
                .onError(e -> System.out.println(">>> ALL RETRIES EXHAUSTED"))
                .onSuccess(e -> System.out.println(">>> SUCCESS after " + e.getNumberOfRetryAttempts()));
    }
}