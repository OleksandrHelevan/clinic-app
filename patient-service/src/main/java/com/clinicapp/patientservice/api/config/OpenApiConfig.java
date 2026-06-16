package com.clinicapp.patientservice.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";
    private static final List<String> GATEWAY_MANAGED_HEADERS = List.of(
            "X-User-Id", "X-Role", "X-Gateway-Token"
    );

    @Bean
    public OpenAPI serviceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Patient Service API")
                        .version("1.0")
                        .description("Requests go through Gateway. Click Authorize and paste JWT from /api/v1/login."))
                .servers(List.of(
                        new Server().url("/").description("Gateway")
                ))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME,
                                new SecurityScheme()
                                        .name(SECURITY_SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }

    @Bean
    public OpenApiCustomizer gatewayHeadersCustomizer() {
        return openApi -> {
            if (openApi.getPaths() == null) {
                return;
            }
            openApi.getPaths().values().forEach(pathItem ->
                    pathItem.readOperations().forEach(this::removeGatewayHeaders)
            );
        };
    }

    private void removeGatewayHeaders(Operation operation) {
        if (operation.getParameters() == null) {
            return;
        }
        operation.getParameters().removeIf(param ->
                "header".equals(param.getIn()) &&
                        GATEWAY_MANAGED_HEADERS.stream()
                                .anyMatch(h -> h.equalsIgnoreCase(param.getName()))
        );
    }
}
