package com.clinicapp.clinicmodule;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.TimeZone;

@SpringBootApplication(
        scanBasePackages = {"com.clinicapp"},
        exclude = {DataSourceAutoConfiguration.class}
)
public class ClinicModuleApplication {
	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(ClinicModuleApplication.class, args);
	}
}