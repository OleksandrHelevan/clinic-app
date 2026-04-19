package com.clinicapp.gatewayservice.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gatewayOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gateway API")
                        .version("1.0")
                        .description("API Gateway documentation"));
    }

    @Bean
    public GroupedOpenApi gatewayApis() {
        return GroupedOpenApi.builder()
                .group("gateway")
                .packagesToScan("com.clinicapp.gatewayservice")
                .build();
    }

}