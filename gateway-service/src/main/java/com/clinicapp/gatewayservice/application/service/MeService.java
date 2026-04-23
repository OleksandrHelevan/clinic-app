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

    public Mono<MeResponse> getMe(String userId) {

        WebClient client = webClient.build();

        Mono<MeContextResponse> contextMono = client
                .get()
                .uri("http://auth-service/api/v1/internal/me-context")
                .header("X-User-Id", userId)
                .header("X-Gateway-Token", "gateway-service-token")
                .retrieve()
                .bodyToMono(MeContextResponse.class);

        return contextMono.flatMap(ctx -> {

            String role = ctx.role();

            Mono<ProfileResponse> profileMono = switch (role) {

                case "DOCTOR" -> client
                        .get()
                        .uri("http://doctor-service/api/v1/doctors/{id}", ctx.userId())
                        .retrieve()
                        .bodyToMono(ProfileResponse.class)
                        .onErrorResume(ex -> {
                            return Mono.just(ProfileResponse.empty());
                        });

                case "PATIENT" -> client
                        .get()
                        .uri("http://patient-service/api/v1/patients/{id}", ctx.userId())
                        .retrieve()
                        .bodyToMono(ProfileResponse.class)
                        .onErrorResume(ex -> {
                            return Mono.just(ProfileResponse.empty());
                        });

                default -> Mono.just(ProfileResponse.empty());
            };

            Mono<List<BookingResponse>> bookingsMono = switch (role) {

                case "DOCTOR" -> client
                        .get()
                        .uri("http://booking-service/api/v1/bookings/doctor/{id}", ctx.userId())
                        .retrieve()
                        .bodyToFlux(BookingResponse.class)
                        .collectList()
                        .onErrorResume(ex -> {
                            return Mono.just(List.of());
                        });

                case "PATIENT" -> client
                        .get()
                        .uri("http://booking-service/api/v1/bookings/patient/{id}", ctx.userId())
                        .retrieve()
                        .bodyToFlux(BookingResponse.class)
                        .collectList()
                        .onErrorResume(ex -> {
                            return Mono.just(List.of());
                        });

                default -> Mono.just(List.of());
            };

            return Mono.zip(profileMono, bookingsMono)
                    .map(tuple -> new MeResponse(
                            ctx.userId(),
                            ctx.role(),
                            tuple.getT1(),
                            tuple.getT2()
                    ));
        });
    }
}