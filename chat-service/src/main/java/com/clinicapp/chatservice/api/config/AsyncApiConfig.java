package com.clinicapp.chatservice.api.config;

import io.github.springwolf.asyncapi.v3.model.info.Info;
import io.github.springwolf.asyncapi.v3.model.server.Server;
import io.github.springwolf.core.configuration.docket.AsyncApiDocket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AsyncApiConfig {

    @Bean
    public AsyncApiDocket asyncApiDocket() {
        Info info = Info.builder()
                .title("Clinic Chat Service API")
                .version("1.0.0")
                .build();

        Server gatewayServer = Server.builder()
                .host("localhost:8080")
                .protocol("ws")
                .pathname("/ws")
                .description("Доступ через API Gateway")
                .build();

        return AsyncApiDocket.builder()
                .basePackage("com.clinicapp.chatservice.api")
                .info(info)
                .server("gateway", gatewayServer)
                .build();
    }
}