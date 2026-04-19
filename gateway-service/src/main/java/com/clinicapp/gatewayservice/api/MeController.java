package com.clinicapp.gatewayservice.api;

import com.clinicapp.gatewayservice.application.dto.MeResponse;
import com.clinicapp.gatewayservice.application.service.MeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class MeController {

    private final MeService meService;

    @GetMapping("/me")
    public Mono<MeResponse> me(
            @RequestHeader("X-User-Id") String userId
    ) {
        return meService.getMe(userId);
    }
}