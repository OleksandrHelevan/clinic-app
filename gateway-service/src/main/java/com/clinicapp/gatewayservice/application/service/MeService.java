package com.clinicapp.gatewayservice.application.service;

import com.clinicapp.common.dto.MeContextResponse;
import com.clinicapp.gatewayservice.application.dto.BookingResponse;
import com.clinicapp.gatewayservice.application.dto.MeResponse;
import com.clinicapp.gatewayservice.application.dto.ProfileResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
@Service
@RequiredArgsConstructor
public class MeService {

    private final WebClient.Builder webClient;

    public Mono<MeResponse> getMe(String userId, String role) {

        WebClient client = webClient.build();

        Mono<ProfileResponse> profileMono = switch (role) {

            case "DOCTOR" -> client.get()
                    .uri("http://doctor-service/api/v1/doctors/me")
                    .header("X-User-Id", userId)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .bodyToMono(ProfileResponse.class)
                    .onErrorResume(ex -> Mono.just(ProfileResponse.empty()));

            case "PATIENT" -> client.get()
                    .uri("http://patient-service/api/v1/patients/me")
                    .header("X-User-Id", userId)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .bodyToMono(ProfileResponse.class)
                    .onErrorResume(ex -> Mono.just(ProfileResponse.empty()));

            default -> Mono.just(ProfileResponse.empty());
        };

        Mono<List<BookingResponse>> bookingsMono = switch (role) {

            case "DOCTOR" -> client.get()
                    .uri("http://booking-service/api/v1/bookings/doctor/{id}", userId)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .bodyToFlux(BookingResponse.class)
                    .collectList()
                    .onErrorResume(ex -> Mono.just(List.of()));

            case "PATIENT" -> client.get()
                    .uri("http://booking-service/api/v1/bookings/patient/{id}", userId)
                    .header("X-Gateway-Token", "gateway-service-token")
                    .retrieve()
                    .bodyToFlux(BookingResponse.class)
                    .collectList()
                    .onErrorResume(ex -> Mono.just(List.of()));

            default -> Mono.just(List.of());
        };

        return Mono.zip(profileMono, bookingsMono)
                .map(tuple -> new MeResponse(userId, role, tuple.getT1(), tuple.getT2()));
    }
}